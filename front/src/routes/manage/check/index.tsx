import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/manage/check/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/manage/check/"!</div>
}
