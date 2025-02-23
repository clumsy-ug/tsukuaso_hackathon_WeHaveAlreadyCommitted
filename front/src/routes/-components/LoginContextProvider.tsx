import { User } from '@supabase/supabase-js'
import { createContext, use } from 'react'
import { Outlet } from '@tanstack/react-router'
import NavbarTop from './NavbarTop'
import Auth from '../auth/-components/Auth'

export const LoginContext = createContext<boolean>(false)
export const UserIdContext = createContext<string>('')

export default function LoginContextProvider({ user }: { user: Promise<User | null> }) {
  const _user = use(user)
  const isLoggedIn = !!_user;  // userが存在すればtrue、そうでなければfalse
  const userId = _user?.id

  // ログイン認証できていないなら強制的にログイン画面を表示する
  if (!isLoggedIn) {
    return <Auth />
  }

  if (!userId) return

  return (
    <>
      <LoginContext value={isLoggedIn}>
        <NavbarTop />
        <UserIdContext value={userId}>
          <Outlet />
        </UserIdContext>
      </LoginContext>
    </>
  )
}
