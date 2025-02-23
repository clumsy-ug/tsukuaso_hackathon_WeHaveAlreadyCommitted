import { Box, Button } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import { Link } from '@tanstack/react-router'
import { use } from 'react'

export default function ToSantaChat({ santaPass }: { santaPass: Promise<number | null> }) {
  const _santaPass = use(santaPass)

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
