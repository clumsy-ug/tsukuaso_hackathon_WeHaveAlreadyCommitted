import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import NavbarTop from './-components/NavbarTop'
import { getSession } from '~/../../clientSupabase/supabase/auth/getSession'
import { redirect } from '@tanstack/react-router'

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    return checkAuthSession(location.pathname)
  },
  component: () => (
    <>
      <NavbarTop />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
})

const checkAuthSession = async (pathname: string) => {
  const pulblicRoutes = ['/auth', '/', '/child-chat']
  const session = await getSession()

  if (session == null && !pulblicRoutes.includes(pathname)) {
    throw redirect({
      to: '/auth',
      search: { redirect: pathname }
    })
  }
}
