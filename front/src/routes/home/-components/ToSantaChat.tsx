import { Box, Button, Typography } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import { User } from '@supabase/supabase-js'
import { Link } from '@tanstack/react-router'
import { use } from 'react'

export default function ToSantaChat({
  user,
  santaPass
}: {
  user: Promise<User | null>
  santaPass: Promise<number | null>
}) {
  const _user = use(user)
  const _santaPass = use(santaPass)

  if (!_user) {
    return (
      <Typography color="error" variant="h6">
        ユーザー認証に失敗しました
      </Typography>
    )
  }

  if (!_santaPass) {
    return
  }

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Button
        component={Link}
        to="/santa/chat"
        variant="contained"
        startIcon={<ChatIcon />}
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
        子供とチャットを始める
      </Button>
    </Box>
  )
}
