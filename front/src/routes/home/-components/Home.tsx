import { Suspense } from 'react'
import { getSession } from '~/../../clientSupabase/supabase/auth/getSession'
import HomePending from './HomePending'
import PromiseReceiver from './PromiseReceiver'

export default function Home() {
  const user = getSession()

  return (
    <Suspense fallback={<HomePending />}>
      <PromiseReceiver user={user} />
    </Suspense>
  )
}
