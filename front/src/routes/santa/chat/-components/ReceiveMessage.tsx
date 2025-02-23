import { Box, Paper, Typography } from '@mui/material'

export default function ReceiveMessage({
  receiveMessages
}: {
  receiveMessages: {
    text: string
    sender: string
  }[]
}) {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        mb: 2,
        p: 2,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {receiveMessages.map((message, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            justifyContent: message.sender === 'santa' ? 'flex-start' : 'flex-end',
            width: '100%'
          }}
        >
          <Paper
            sx={{
              p: 2,
              mb: 2,
              maxWidth: '80%',
              bgcolor: message.sender === 'santa' ? '#e3f2fd' : '#e8f5e9',
              borderRadius: 2,
              boxShadow: 1
            }}
          >
            <Typography
              sx={{
                fontSize: '1rem',
                lineHeight: 1.6,
                color: '#37474f'
              }}
            >
              {message.text}
            </Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  )
}
