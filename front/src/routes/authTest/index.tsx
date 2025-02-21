import { createFileRoute } from '@tanstack/react-router'
import Signup from './-components/signup'
import Login from './-components/login'

export const Route = createFileRoute('/authTest/')({
  component: Auth
})

function Auth() {
  return (
    <div>
      <Signup />
      <Login />
    </div>
  )
}
