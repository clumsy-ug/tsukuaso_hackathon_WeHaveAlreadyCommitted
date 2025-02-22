import { Button, TextField } from '@mui/material'
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

  onLoginSubmit
}: LoginProps) {
  return (
    <>
      {sectionNumber === 0 && (
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              label="メールアドレス"
              style={{ marginTop: '15px' }}
              onChange={onMailChange}
              onBlur={onBlurMailInput}
              error={isMailInputEmpty}
              helperText={isMailInputEmpty ? '入力してください' : ''}
            />

            <TextField
              label="パスワード"
              style={{ marginTop: '15px' }}
              onChange={onPassChange}
              onBlur={onBlurPassInput}
              error={isPassInputEmpty}
              helperText={isPassInputEmpty ? '入力してください' : ''}
              type="password"
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              size="large"
              variant="contained"
              onClick={onLoginSubmit}
              sx={{
                width: '80%',
                padding: 2
              }}
            >
              ログイン
            </Button>
          </Box>
        </Box>
      )}
    </>
  )
}
