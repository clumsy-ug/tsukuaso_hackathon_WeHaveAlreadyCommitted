import { createFileRoute } from '@tanstack/react-router'
import Todo from '../-components/Todo'

export const Route = createFileRoute('/posts/$postId/')({
  component: Todo,
})
