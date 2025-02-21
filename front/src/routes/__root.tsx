import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import NavbarTop from './-components/NavbarTop'
import NavbarBottom from './-components/NavbarBottom'

export const Route = createRootRoute({
  component: () => (
    <>
      <NavbarTop />
      <Outlet />
      <NavbarBottom />
      <TanStackRouterDevtools />
    </>
  ),
})
