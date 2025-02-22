import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/child-chat/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/child-chat/"!</div>
}
