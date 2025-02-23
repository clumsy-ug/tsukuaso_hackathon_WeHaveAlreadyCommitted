import { createCallable } from 'react-call'
import { RegisterManagePassProps } from '../-types'
import { Response } from '../-types'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { saveSantaPass } from '~/../../clientSupabase/supabase/santaPass/santaPass'

export const RegisterSantaPass = createCallable<RegisterManagePassProps, Response>(
  ({ call, setRegisterSuccess }) => {
    const [newSantaPass, setNewSantaPass] = useState<string>('')
    const [isPassEmpty, setIsPassEmpty] = useState<boolean>(false)

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
        call.end(false)
      } else {
        setRegisterSuccess(true) // 画面更新する(ボタンが消えた状態になるはず)ために再レンダリング → このやり方は本当に最適解か？

        call.end(true)

        /*await router.invalidate()
        navigate({
          to: '/home',
          replace: true,
          search: { _t: Date.now() } // クエリパラメータを変更して強制的に再読み込み
        })*/
      }
    }

    return (
      <Dialog open={true} onClose={() => call.end(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', color: '#FF4B79', pb: 1 }}>
          パスワードの設定
        </DialogTitle>

        <DialogContent>
          <TextField
            label="新しい4桁パスワードを入力"
            fullWidth
            margin="dense"
            onChange={onPassChange}
            onBlur={onBlurPassInput}
            error={isPassEmpty}
            helperText={isPassEmpty ? '入力してください' : '半角数字4桁で入力してください'}
            sx={{ mt: 2 }}
            inputProps={{
              maxLength: 4,
              inputMode: 'numeric',
              pattern: '[0-9]*'
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => call.end(false)} sx={{ color: 'text.secondary', mr: 1 }}>
            キャンセル
          </Button>
          <Button
            variant="contained"
            onClick={onSubmit}
            sx={{
              bgcolor: '#FF4B79',
              '&:hover': { bgcolor: '#FF3366' },
              px: 4
            }}
          >
            設定する
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
)
