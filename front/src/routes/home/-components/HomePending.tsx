import { Box, styled, Typography } from '@mui/material'
import PacmanLoader from 'react-spinners/PacmanLoader'

const CenteredContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column', // 子要素を縦に並べる
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // ビューポートの高さいっぱいに広げる
  width: '100vw' // ビューポートの幅いっぱいに広げる,  なくても良い
})

const StyledPacmanLoader = styled(PacmanLoader)(({ theme }) => ({
  // color: theme.palette.primary.main,  // MUIテーマの色を使う例
  //margin: theme.spacing(2), // MUIのspacingを使う例 (上下にマージン)
  marginBottom: theme.spacing(3)
}))

export default function HomePending() {
  return (
    <CenteredContainer>
      <StyledPacmanLoader size={50} />
      <Typography variant="h6" color="textSecondary">
        ローディング中...
      </Typography>
    </CenteredContainer>
  )
}
