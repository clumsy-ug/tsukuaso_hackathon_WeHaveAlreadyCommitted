import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import { SignupProps } from '../-types'

import Button from '@mui/material/Button'
// 新規登録フォーム
export default function Signup({
  sectionNumber,
  onMailChange,
  onBlurMailInput,
  isMailInputEmpty,
  onPassChange,
  onBlurPassInput,
  isPassInputEmpty,

  onSignupSubmit
}: SignupProps) {
  return (
    <>
      {sectionNumber === 1 && (
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
              onClick={onSignupSubmit}
              sx={{
                width: '80%',
                padding: 2
              }}
            >
              新規登録
            </Button>
          </Box>
        </Box>
      )}
    </>
  )
}
