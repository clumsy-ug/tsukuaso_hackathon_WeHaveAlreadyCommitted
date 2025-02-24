import { Link } from '@tanstack/react-router'
import { Box, Container, Typography, Button, Card, CardContent, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

const TopBackground = styled(Box)({
  background: 'linear-gradient(165deg, #FFE0E8 0%, #FFF2F5 100%)',
  minHeight: '580px',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '0 0 40px 40px'
})

const MagicButton = styled(Button)({
  padding: '16px 48px',
  borderRadius: '100px',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  background: 'linear-gradient(45deg, #FF4B79 30%, #FF7995 90%)',
  color: 'white',
  boxShadow: '0 8px 24px rgba(255, 75, 121, 0.25)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #FF3366 30%, #FF6683 90%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 28px rgba(255, 75, 121, 0.3)'
  }
})

const StyledCard = styled(Card)({
  borderRadius: 24,
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.06)',
  background: 'white',
  position: 'relative',
  overflow: 'visible',
  '&::before': {
    content: '""',
    position: 'relative',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: 'linear-gradient(45deg, #FFE0E8, #FFF2F5)',
    zIndex: -1,
    borderRadius: 26
  }
})

export default function Home() {
  return (
    <Box sx={{ bgcolor: '#fff' }}>
      <TopBackground>
        <Container maxWidth="md">
          <Stack alignItems="center" spacing={6} pt={12}>
            <Stack spacing={1} alignItems="center">
              <Typography
                variant="h2"
                align="center"
                sx={{
                  fontWeight: 800,
                  color: '#FF4B79',
                  letterSpacing: -0.5,
                  fontSize: { xs: '2.5rem', sm: '3.5rem' },
                  position: 'relative',
                  // 下線のアニメーション
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -4,
                    left: 0,
                    width: '100%',
                    height: 3,
                    backgroundColor: '#FF4B79',
                    animation: 'expandLine 1s ease-out forwards'
                  },
                  // テキストのフェードイン
                  animation: 'fadeIn 1s ease-out',
                  '@keyframes fadeIn': {
                    from: { opacity: 0, transform: 'translateY(20px)' },
                    to: { opacity: 1, transform: 'translateY(0)' }
                  },
                  '@keyframes expandLine': {
                    from: { width: '0%' },
                    to: { width: '100%' }
                  }
                }}
              >
                サンタさんとはなそう！
              </Typography>
            </Stack>

            <Link to="/auth" style={{ textDecoration: 'none' }}>
              <MagicButton variant="contained" disableElevation startIcon={<AutoAwesomeIcon />}>
                サンタさんとして始める
              </MagicButton>
            </Link>
          </Stack>
        </Container>
      </TopBackground>

      <Container maxWidth="md" sx={{ mt: -8, mb: 8 }}>
        <StyledCard>
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                color: '#FF4B79',
                fontWeight: 700,
                mb: 4,
                fontSize: { xs: '1.5rem', sm: '1.75rem' }
              }}
            >
              ✨ クリスマスまでの特別なひみつ
            </Typography>

            <Stack spacing={3}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  lineHeight: 1.8,
                  color: '#2C3E50'
                }}
              >
                サンタさんとリアルタイムでおはなしができる、夢のようなアプリです。
                子供にだけ届く特別な招待状を使って、サンタさんと楽しくチャット！
                「ほしいプレゼント」や「ふだんがんばっていること」を、
                サンタさんに直接つたえることができます。
              </Typography>
            </Stack>
          </CardContent>
        </StyledCard>
      </Container>
    </Box>
  )
}
