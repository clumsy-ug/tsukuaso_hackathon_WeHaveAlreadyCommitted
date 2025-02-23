import { createFileRoute } from '@tanstack/react-router'
import CheckPass from './-components/CheckPass'
import ChildChatPending from './-components/ChildChatPending'
import ChildChatError from './-components/ChildChatError'

export const Route = createFileRoute('/child-chat/$room/')({
  component: CheckPass,
  pendingComponent: ChildChatPending,
  errorComponent: ChildChatError
})
