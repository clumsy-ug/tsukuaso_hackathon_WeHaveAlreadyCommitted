import { createFileRoute } from '@tanstack/react-router'
import ChildChat from './-components/ChildChat'
import ChildChatPending from './-components/ChildChatPending'
import ChildChatError from './-components/ChildChatError'

export const Route = createFileRoute('/child-chat/')({
  component: ChildChat,
  pendingComponent: ChildChatPending,
  errorComponent: ChildChatError
})
