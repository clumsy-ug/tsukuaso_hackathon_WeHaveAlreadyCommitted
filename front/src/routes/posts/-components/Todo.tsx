import { useParams } from "@tanstack/react-router"

export default function Todo() {
  const { postId } = useParams({ from: '/posts/$postId/' })
  
  return (
    <h3>{postId} のpostを表示するページ</h3>
  )
}
