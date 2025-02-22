import { createFileRoute } from '@tanstack/react-router'
import SantaChat from './-components/SantaChat'
import SantaChatPending from './-components/SantaChatPending'
import SantaChatError from './-components/SantaChatError'

export const Route = createFileRoute('/santa/chat/')({
  component: SantaChat,
  pendingComponent: SantaChatPending,
  errorComponent: SantaChatError
})
