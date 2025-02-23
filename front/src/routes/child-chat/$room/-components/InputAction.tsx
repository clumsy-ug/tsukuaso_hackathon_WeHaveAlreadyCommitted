import { Mic } from '@mui/icons-material'
import { Box, Button, IconButton, TextField } from '@mui/material'

type InputActionProps = {
  sendMessage: string
  setSendMessage: (message: string) => void
  onSendClick: () => void
  onMicClick: () => void
}

export default function InputAction({
  sendMessage,
  setSendMessage,
  onSendClick,
  onMicClick
}: InputActionProps) {
  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2 },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // モバイルでは縦並び
        gap: { xs: 1, sm: 2 },
        mb: 2
      }}
    >
      <TextField
        fullWidth
        value={sendMessage}
        onChange={(e) => setSendMessage(e.target.value)}
        placeholder="サンタにメッセージを送る"
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            color: 'white',
            bgcolor: 'rgba(0, 0, 0, 0.8)',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)'
            }
          }
        }}
      />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="contained"
          onClick={onSendClick}
          sx={{
            bgcolor: '#ffd700',
            color: 'black',
            '&:hover': {
              bgcolor: '#ffed4a'
            }
          }}
        >
          送信
        </Button>
        <IconButton
          onClick={onMicClick}
          sx={{
            color: 'black',
            border: '2px solid #ffd700',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              bgcolor: 'rgba(107, 107, 107, 0.2)'
            }
          }}
        >
          <Mic />
        </IconButton>
      </Box>
    </Box>
  )
}
