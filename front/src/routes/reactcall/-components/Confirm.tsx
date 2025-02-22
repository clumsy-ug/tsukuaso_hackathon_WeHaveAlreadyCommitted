import { createCallable } from 'react-call'
import { useNavigate } from '@tanstack/react-router'
import { Props, Response } from '../-types'
import { ChangeEvent, useEffect, useState } from 'react'
import { isExitPasswordCheck } from '~/../../clientSupabase/supabase/santaPass/santaPass'
import { verifySantaPass } from '~/../../clientSupabase/supabase/santaPass/santaPass'
import { saveSantaPass } from '~/../../clientSupabase/supabase/santaPass/santaPass'

export const Confirm = createCallable<Props, Response>(({ call, message }) => {
  const [password, setPassword] = useState<string>("")
  const [hasPassword, setHasPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)  // useEffectのラグによるちらつきを防ぐ
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    const initialFunc = async() => {
      const _hasPassword = await isExitPasswordCheck()
      if (_hasPassword) {
        setHasPassword(true)
      }
      setIsLoading(false)
    }
    initialFunc()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleClick = async() => {
    if (password.length !== 4 || isNaN(Number(password))) {
      alert('パスワードは4桁の半角数字である必要があります')
      return
    }

    const parsedPassword = Number(password)
    if (hasPassword) {
      const isCorrect = await verifySantaPass(parsedPassword)
      if (isCorrect) {
        call.end(true)
        navigate({ to: "/santa/chat" })
      } else {
        alert('パスワードが間違っています')
        call.end(true)
      }
    } else {
      const registered = await saveSantaPass(parsedPassword)
      if (registered) {
        call.end(true)
        navigate({ to: "/santa/chat" })
      } else {
        alert('パスワード登録に失敗しました')
        call.end(true)
      }
    }
  }

  return (
    <div role="dialog">
      {isLoading ? (
        <h1>ローディング中...</h1>
      ) : (
        <>
          <p>{hasPassword ? '登録済みの' : '新しい'}{message}</p>
          {hasPassword ? (
            <input type="text" placeholder="パスワード入力" value={password} onChange={handleChange} />
          ) : (
          <input type="text" placeholder="新規パスワード登録" />
          )}
          <button onClick={handleClick}>送信</button>
        </>
      )}
    </div>
  )
})
