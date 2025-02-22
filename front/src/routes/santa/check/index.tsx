import { createFileRoute } from '@tanstack/react-router'
import SantaCheck from './-components/SantaCheck'
import SantaCheckPending from './-components/SantaCheckPending'
import SantaCheckError from './-components/SantaCheckError'

export const Route = createFileRoute('/santa/check/')({
  component: SantaCheck,
  pendingComponent: SantaCheckPending,
  errorComponent: SantaCheckError
})
