import { useParams } from "@tanstack/react-router"

export default function Edit() {
  const { postId } = useParams({ from: '/posts/$postId/edit' })

  return (
    <h3>{postId} の編集をするページ</h3>
  )
}