import { createCallable } from 'react-call'
import { PassModalProps, Response } from '../-types'
import { ChangeEvent, useState } from 'react'
import { verifySantaPass } from '~/../../clientSupabase/supabase/santaPass/santaPass'
import { Box, Button, Card, CardContent, TextField } from '@mui/material'

export const PassModal = createCallable<PassModalProps, Response>(
  ({ call, message, setPassOk }) => {
    const [santaPass, setSantaPass] = useState<string>('')
    const [isPassEmpty, setIsPassEmpty] = useState<boolean>(false)

    const onPassChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSantaPass(e.target.value)
      if (e.target.value) {
        setIsPassEmpty(false)
      }
    }

    const onBlurPassInput = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (!e.target.value) {
        setIsPassEmpty(true)
      }
    }

    const onSubmit = async () => {
      if (!santaPass) {
        alert('入力欄が空欄です')
        return
      }

      if (santaPass.length !== 4 || isNaN(Number(santaPass))) {
        alert('パスワードは4桁の半角数字である必要があります')
        return
      }

      const parsedNewSantaPass = Number(santaPass)
      const ok = await verifySantaPass(parsedNewSantaPass)
      if (!ok) {
        alert('認証に失敗しました')
      } else {
        call.end(true)
        setPassOk(true)
      }
    }

    return (
      <div role="dialog">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh' //正確には縦に対して中央寄せができていない
          }}
        >
          <Card
            sx={{
              width: {
                xs: '90%', // 画面が小さい時
                sm: '400px', // 小型画面
                md: '500px' // 中型画面
              },
              maxWidth: '700px',
              margin: 'auto'
            }}
            variant="outlined"
          >
            <CardContent>
              <Box>
                <Box sx={{ p: 3 }}>
                  <p>{message}</p>

                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                      label="登録済みの4桁パスワードを入力"
                      style={{ marginTop: '15px' }}
                      onChange={onPassChange}
                      onBlur={onBlurPassInput}
                      error={isPassEmpty}
                      helperText={isPassEmpty ? '入力してください' : ''}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                      size="large"
                      variant="contained"
                      onClick={onSubmit}
                      sx={{
                        width: '80%',
                        padding: 2
                      }}
                    >
                      登録
                    </Button>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </div>
    )
  }
)
