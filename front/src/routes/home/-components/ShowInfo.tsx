import { use } from 'react'
import { ShowInfoProps } from '../-types'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

export default function ShowInfo({ user, santaPass }: ShowInfoProps) {
  const _user = use(user)
  const _santaPass = use(santaPass)

  if (!_user) {
    return <h1>ユーザー認証に失敗しました</h1>
  }

  if (!_santaPass) return

  const baseUrl = window.location.origin
  const inviteLink = `${baseUrl}/child-chat?id=${_user.id}`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
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
          パスワード（上👆の招待リンク先に入室する際に必要です）
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
