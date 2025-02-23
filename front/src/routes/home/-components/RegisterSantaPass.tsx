import { createCallable } from 'react-call'
import { RegisterManagePassProps } from '../-types'
import { Response } from '../-types'
import { Box, Button, Card, CardContent, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { saveSantaPass } from '~/../../clientSupabase/supabase/santaPass/santaPass'
import { useNavigate } from '@tanstack/react-router'

export const RegisterSantaPass = createCallable<RegisterManagePassProps, Response>(
  ({ call, message, setRegisterSuccess }) => {
    const [newSantaPass, setNewSantaPass] = useState<string>('')
    const [isPassEmpty, setIsPassEmpty] = useState<boolean>(false)
    const navigate = useNavigate()

    const onPassChange = (e: ChangeEvent<HTMLInputElement>) => {
      setNewSantaPass(e.target.value)
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
      if (!newSantaPass) {
        alert('入力欄が空欄です')
        return
      }

      if (newSantaPass.length !== 4 || isNaN(Number(newSantaPass))) {
        alert('パスワードは4桁の半角数字である必要があります')
        return
      }

      const parsedNewSantaPass = Number(newSantaPass)
      const ok = await saveSantaPass(parsedNewSantaPass)
      if (!ok) {
        alert('登録に失敗しました')
      } else {
        alert(`登録成功! 4桁パスワード: ${parsedNewSantaPass}`)
        call.end(true)
        navigate({ to: '/home' })
        setRegisterSuccess(true)  // 画面更新する(ボタンが消えた状態になるはず)ために再レンダリング → このやり方は本当に最適解か？
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
                      label="新しい4桁パスワードを入力"
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
