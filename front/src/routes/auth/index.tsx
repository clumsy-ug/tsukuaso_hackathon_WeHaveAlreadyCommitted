import { createFileRoute } from '@tanstack/react-router'
import Auth from './-components/Auth'
import AuthPending from './-components/AuthPending'
import AuthError from './-components/AuthError'
import { checkSession } from './-functions/checkSession'

export const Route = createFileRoute('/auth/')({
  beforeLoad: checkSession,
  component: Auth,
  pendingComponent: AuthPending,
  errorComponent: AuthError
})
