import { User } from '@supabase/supabase-js'
import { Link } from '@tanstack/react-router'
import { use } from 'react'

export default function ToSantaChat({ user }: { user: Promise<User | null> }) {
  use(user)

  return (
    <Link to='/santa/chat'>管理者チャットへ</Link>
  )
}
