import { Suspense, useState } from 'react'
import { getSession } from '~/../../clientSupabase/supabase/auth/getSession'
import { getSantaPass } from '~/../../clientSupabase/supabase/santaPass/santaPass'
import HomePending from './HomePending'
import ToSantaChat from './ToSantaChat'
import ShowInfo from './ShowInfo'
import CheckSantaPassExists from './CheckSantaPassExists'
import { Box, Card, Container, styled } from '@mui/material'

const StyledCard = styled(Card)(() => ({
  maxWidth: 700,
  width: '90%',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  background: 'white',
  position: 'relative',
  border: '2px solid #e0e0e0',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: 'linear-gradient(45deg, #FFE0E8, #FFF2F5)',
    zIndex: -1,
    borderRadius: 18
  }
}))

export default function Home() {
  const user = getSession()
  const santaPass = getSantaPass()
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false)
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4
        }}
      >
        <Suspense fallback={<HomePending />}>
          <StyledCard>
            <ShowInfo user={user} santaPass={santaPass} />
            {!registerSuccess && (
              <CheckSantaPassExists santaPass={santaPass} setRegisterSuccess={setRegisterSuccess} />
            )}
            <ToSantaChat user={user} santaPass={santaPass} />
          </StyledCard>
        </Suspense>
      </Box>
    </Container>
  )
}
