import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import { LoginProps } from '../-types'

// ログインフォーム
export default function Login({
  sectionNumber,
  onMailChange,
  onBlurMailInput,
  isMailInputEmpty,
  onPassChange,
  onBlurPassInput,
  isPassInputEmpty,
  mailAddress,
  password,
  onLoginSubmit
}: LoginProps) {
  return (
    <>
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
    </>
  )
}
