import { createFileRoute } from '@tanstack/react-router'
import ReactCall from './-components/ReactCall'
import ReactCallPending from './-components/ReactCallPending'
import ReactCallError from './-components/ReactCallError'

export const Route = createFileRoute('/reactcall/')({
  component: ReactCall,
  pendingComponent: ReactCallPending,
  errorComponent: ReactCallError
})
