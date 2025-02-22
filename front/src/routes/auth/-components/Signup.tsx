import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import { SignupProps } from '../-types'

// 新規登録フォーム
export default function Signup({
  sectionNumber,
  onMailChange,
  onBlurMailInput,
  isMailInputEmpty,
  onPassChange,
  onBlurPassInput,
  isPassInputEmpty,
  mailAddress,
  password,
  onSignupSubmit
}: SignupProps) {
  return (
    <>
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
    </>
  )
}
