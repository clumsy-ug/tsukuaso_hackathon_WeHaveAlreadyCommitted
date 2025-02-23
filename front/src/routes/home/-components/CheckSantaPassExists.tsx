import { use } from 'react'
import { RegisterSantaPass } from './RegisterSantaPass'
import Box from '@mui/material/Box'
import { Button, Typography } from '@mui/material'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import KeyIcon from '@mui/icons-material/Key'

// もし4桁passがなかったら新規登録用のボタンを出すコンポーネント
export default function CheckSantaPassExists({
  santaPass,
  setRegisterSuccess
}: {
  santaPass: Promise<number | null>
  setRegisterSuccess: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const _santaPass = use(santaPass)

  if (_santaPass) return // 既に4桁pass登録済みなら強制終了

  const handleClick = async () => {
    await RegisterSantaPass.call({ message: 'パスワードを登録してください', setRegisterSuccess })
  }

  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3
      }}
    >
      {/* アイコン */}
      <Box
        sx={{
          bgcolor: '#FFE0E8',
          borderRadius: '50%',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <KeyIcon sx={{ fontSize: 40, color: '#FF4B79' }} />
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#FF4B79' }}>
          簡易招待パスワードの設定
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          子供たちとチャットを始めるために
          <br />
          4桁のパスワードを設定してください
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
          ※ このパスワードは子供たちがチャットルームに
          <br />
          入室する際に必要となります
        </Typography>
      </Box>

      <RegisterSantaPass.Root />

      <Button
        onClick={handleClick}
        variant="contained"
        startIcon={<LockOpenIcon />}
        sx={{
          bgcolor: '#FF4B79',
          '&:hover': {
            bgcolor: '#FF3366'
          },
          px: 4,
          py: 1.5,
          borderRadius: 2,
          fontSize: '1rem'
        }}
      >
        パスワードを設定する
      </Button>
    </Box>
  )
}
