import { use, useContext } from 'react'
import { ShowInfoProps } from '../-types'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { UserIdContext } from '~/routes/-components/LoginContextProvider'

export default function ShowInfo({ santaPass }: ShowInfoProps) {
  const _santaPass = use(santaPass)
  const userId = useContext(UserIdContext)

  if (!_santaPass) return

  const baseUrl = window.location.origin
  const inviteLink = `${baseUrl}/child-chat/${userId}`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => alert('コピーしました'))
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          招待リンク
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#f5f5f5',
            p: 2,
            borderRadius: 1
          }}
        >
          <Typography
            variant="body2"
            sx={{
              flex: 1,
              fontFamily: 'monospace',
              wordBreak: 'break-all'
            }}
          >
            {inviteLink}
          </Typography>
          <Tooltip title="リンクをコピー">
            <IconButton onClick={() => copyToClipboard(inviteLink)} size="small">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          パスワード
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#f5f5f5',
            p: 2,
            borderRadius: 1
          }}
        >
          <Typography
            variant="body2"
            sx={{
              flex: 1,
              fontFamily: 'monospace',
              wordBreak: 'break-all'
            }}
          >
            {_santaPass}
          </Typography>
          <Tooltip title="パスワードをコピー">
            <IconButton onClick={() => copyToClipboard(_santaPass.toString())} size="small">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )
}
