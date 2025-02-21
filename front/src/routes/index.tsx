import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
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
