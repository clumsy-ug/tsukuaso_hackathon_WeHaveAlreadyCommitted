import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Outlet } from '@tanstack/react-router'
import NavbarTop from './NavbarTop'

export default function Root() {
  return (
    <>
      <NavbarTop />
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  )
}
