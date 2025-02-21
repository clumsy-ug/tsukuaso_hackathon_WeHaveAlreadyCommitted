import { createFileRoute } from '@tanstack/react-router'
import Auth from './-components/Auth'
import AuthPending from './-components/AuthPending'
import AuthError from './-components/AuthError'

export const Route = createFileRoute('/auth/')({
  component: Auth,
  pendingComponent: AuthPending,
  errorComponent: AuthError
})
