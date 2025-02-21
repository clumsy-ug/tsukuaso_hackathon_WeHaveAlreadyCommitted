import { createFileRoute } from '@tanstack/react-router'
import Signup from './-components/signup'
import Login from './-components/login'
import { getSession } from '../../../../clientSupabase/supabase/auth/getSession'

export const Route = createFileRoute('/authTest/')({
  component: Auth
})

function Auth() {
  async function handleGetSession() {
    const user = await getSession()
    console.log(user)
  }
  return (
    <div>
      <Signup />
      <Login />
      <button onClick={handleGetSession}>session確認</button>
    </div>
  )
}
