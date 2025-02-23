import { Suspense } from 'react'
import { getSession } from '~/../../clientSupabase/supabase/auth/getSession'
import { getSantaPass } from '~/../../clientSupabase/supabase/santaPass/santaPass'
import HomePending from './HomePending'
import ToSantaChat from './ToSantaChat'
import ShowInfo from './ShowInfo'

export default function Home() {
  const user = getSession()
  const santaPass = getSantaPass()

  return (
    <Suspense fallback={<HomePending />}>
      <ToSantaChat user={user} />
      <ShowInfo user={user} santaPass={santaPass} />
    </Suspense>
  )
}
