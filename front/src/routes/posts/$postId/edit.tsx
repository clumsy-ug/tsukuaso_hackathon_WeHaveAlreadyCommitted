import { createFileRoute } from '@tanstack/react-router'
import Edit from '../-components/Edit'

export const Route = createFileRoute('/posts/$postId/edit')({
  component: Edit,
})
