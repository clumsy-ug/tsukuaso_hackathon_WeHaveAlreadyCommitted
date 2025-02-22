import { Suspense } from 'react'
import { getSession } from '~/../../clientSupabase/supabase/auth/getSession'
import HomePending from './HomePending'
import ToSantaChat from './ToSantaChat'

export default function Home() {
  const user = getSession()

  return (
    <Suspense fallback={<HomePending />}>
      <ToSantaChat user={user} />
    </Suspense>
  )
}
