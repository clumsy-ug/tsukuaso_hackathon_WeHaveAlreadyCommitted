import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { TextField } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

export default function Auth() {
  const [mailAddress, setMailAddress] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isMailInputEmpty, setIsMailInputEmpty] = useState<boolean>(false)
  const [isPassInputEmpty, setIsPassInputEmpty] = useState<boolean>(false)
  const [sectionNumber, setSectionNumber] = useState<number>(0) // 0がログイン、1が新規登録

  const onSectionChange = (_e: SyntheticEvent, newValue: number) => {
    setSectionNumber(newValue)
    setMailAddress('')
    setPassword('')
    setIsMailInputEmpty(false)
    setIsPassInputEmpty(false)
  }

  const onMailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMailAddress(e.target.value)
    if (e.target.value) {
      setIsMailInputEmpty(false)
    }
  }

  const onPassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (e.target.value) {
      setIsPassInputEmpty(false)
    }
  }

  // TextFieldからフォーカスが離れたときに実行する関数
  const onBlurMailInput = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!e.target.value) {
      setIsMailInputEmpty(true)
    }
  }

  const onBlurPassInput = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!e.target.value) {
      setIsPassInputEmpty(true)
    }
  }

  const onLoginSubmit = () => {
    if (isMailInputEmpty || isPassInputEmpty) {
      alert('メールアドレスもしくはパスワードが入力されていません')
      return
    }
    alert('ログインのAPIリクエストを送るよ')
  }

  const onSignupSubmit = () => {
    if (isMailInputEmpty || isPassInputEmpty) {
      alert('メールアドレスもしくはパスワードが入力されていません')
      return
    }
    alert('ログインのAPIリクエストを送るよ')
  }

  return (
    <div>
      <Box>
        <Box sx={{ borderBottom: 3, borderColor: 'divider' }}>
          <Tabs value={sectionNumber} onChange={onSectionChange}>
            <Tab label="ログイン" />
            <Tab label="新規登録" />
          </Tabs>
        </Box>

        {/* ログインフォーム */}
        {sectionNumber === 0 && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                label="メールアドレス"
                style={{ width: '400px', margin: '5px' }}
                onChange={onMailChange}
                onBlur={onBlurMailInput}
                error={isMailInputEmpty}
                helperText={isMailInputEmpty ? '入力してください' : ''}
              />

              <TextField
                label="パスワード"
                style={{ width: '400px', margin: '5px' }}
                onChange={onPassChange}
                onBlur={onBlurPassInput}
                error={isPassInputEmpty}
                helperText={isPassInputEmpty ? '入力してください' : ''}
                type="password"
              />
            </Box>

            <p>mail: {mailAddress}</p>
            <p>pass: {password}</p>
            <button onClick={onLoginSubmit}>ログイン</button>
          </Box>
        )}

        {/* 新規登録フォーム */}
        {sectionNumber === 1 && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                label="メールアドレス"
                style={{ width: '400px', margin: '5px' }}
                onChange={onMailChange}
                onBlur={onBlurMailInput}
                error={isMailInputEmpty}
                helperText={isMailInputEmpty ? '入力してください' : ''}
              />

              <TextField
                label="パスワード"
                style={{ width: '400px', margin: '5px' }}
                onChange={onPassChange}
                onBlur={onBlurPassInput}
                error={isPassInputEmpty}
                helperText={isPassInputEmpty ? '入力してください' : ''}
                type="password"
              />
            </Box>

            <p>mail: {mailAddress}</p>
            <p>pass: {password}</p>
            <button onClick={onSignupSubmit}>新規登録</button>
          </Box>
        )}
      </Box>
    </div>
  )
}
