import { Send } from '@mui/icons-material'
import { Box, Button, TextField } from '@mui/material'

type InputActionProps = {
  sendMessage: string
  setSendMessage: (message: string) => void
  onSendClick: () => void
}

export default function InputAction({
  sendMessage,
  setSendMessage,
  onSendClick
}: InputActionProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        p: 1,
        borderTop: 1,
        borderColor: 'divider'
      }}
    >
      <TextField
        fullWidth
        value={sendMessage}
        onChange={(e) => setSendMessage(e.target.value)}
        placeholder="メッセージを入力..."
        variant="outlined"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#fff'
          }
        }}
      />
      <Button
        variant="contained"
        onClick={onSendClick}
        sx={{
          minWidth: '100px',
          bgcolor: '#1976d2',
          '&:hover': {
            bgcolor: '#1565c0'
          }
        }}
        endIcon={<Send />}
      >
        送信
      </Button>
    </Box>
  )
}
