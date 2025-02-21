import { createFileRoute, Link } from '@tanstack/react-router'
import HomePending from './-components/HomePending'
import HomeError from './-components/HomeError'

export const Route = createFileRoute('/')({
  component: Home,
  pendingComponent: HomePending,
  errorComponent: HomeError
})

function Home() {
  return (
    <div>
      <h1>Welcome Home!</h1>
      <Link to='/posts'>
        Todo一覧
      </Link>
    </div>
  )
}
