import { createFileRoute } from '@tanstack/react-router'
import TodoList from './-components/TodoList'
import Form from './-components/Form'

export const Route = createFileRoute('/posts/')({
  component: () => (
    <div>
      <TodoList />
      <Form />
    </div>
  )
})
