import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import NavbarTop from './-components/NavbarTop'

export const Route = createRootRoute({
  component: () => (
    <>
      <NavbarTop />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
