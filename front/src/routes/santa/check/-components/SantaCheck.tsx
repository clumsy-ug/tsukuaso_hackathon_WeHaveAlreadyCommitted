import { useEffect, useState } from 'react'
import {
  saveSantaPass,
  isExitPasswordCheck,
  verifySantaPass
} from '~/../../clientSupabase/supabase/santaPass/santaPass'

export default function SantaCheck() {
  const [password, setPassword] = useState<number>(1111) //TODO null回避で初期値1111 バリデーションチェックで4桁のみにしたい

  const handleSave = async () => {
    try {
      await saveSantaPass(password)
      alert('パスワードを保存しました')
    } catch (error) {
      console.error('エラー:', error)
    }
  }

  const handlePassCheck = async () => {
    const isCheck = await verifySantaPass(password)
    if (isCheck) {
      alert('認証成功')
    } else {
      alert('認証失敗')
    }
  }

  useEffect(() => {
    const initCheck = async () => {
      const isExitPassword: boolean = await isExitPasswordCheck()
      if (isExitPassword) {
        alert('パスワードが設定済みです')
      } else {
        alert('パスワードが未設定です')
      }
    }

    initCheck()
  }, [])

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(Number(e.target.value))}
      />
      <button onClick={handleSave}>登録</button>
      <button onClick={handlePassCheck}>認証</button>
    </div>
  )
}
