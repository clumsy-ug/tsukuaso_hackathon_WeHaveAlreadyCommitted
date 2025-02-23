import { User } from '@supabase/supabase-js'
import { Link } from '@tanstack/react-router'
import { use } from 'react'

export default function ToSantaChat({ user }: { user: Promise<User | null> }) {
  const _user = use(user)

  if (!_user) {
    return <h1>ユーザー認証に失敗しました</h1>
  }

  return (
    <Link to='/santa/chat'>管理者チャットへ</Link>
  )
}
