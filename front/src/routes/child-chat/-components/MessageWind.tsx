import { Box, Paper, Typography } from '@mui/material'

export default function MessageWind({
  receiveMessages
}: {
  receiveMessages: {
    text: string
    sender: string
  }[]
}) {
  return (
    <Paper
      sx={{
        mx: { xs: 1, sm: 2, md: 3 },
        my: 2,
        bgcolor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        p: { xs: 2, sm: 3 },
        minHeight: { xs: 100, sm: 150 },
        borderRadius: 2,
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      <Typography variant="h6" sx={{ color: '#ffd700', mb: 2 }}>
        サンタ
      </Typography>
      <Box sx={{ maxHeight: { xs: 150, sm: 200 }, overflowY: 'auto' }}>
        <Typography
          sx={{ mb: 2, fontSize: { xs: '1.4rem', sm: '1.6rem' }, letterSpacing: '0.4em' }}
        >
          {receiveMessages[receiveMessages.length - 1]?.text || ''}
        </Typography>
      </Box>
    </Paper>
  )
}
