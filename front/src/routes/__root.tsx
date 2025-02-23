import { createRootRoute } from '@tanstack/react-router'
import Root from './-components/Root'

export const Route = createRootRoute({
  // beforeLoad: async ({ location }) => {
  //   return checkAuthSession(location.pathname)
  // },
  component: () => <Root />
})

/*
const checkAuthSession = async (pathname: string) => {
  // パターンマッチングのための関数
  const isPublicPath = (path: string) => {
    const publicRoutes = [
      '/auth',
      '/',
      // child-chatで始まるパスすべてを許可
      '/child-chat'
    ]

    return publicRoutes.some((route) => {
      if (route === '/child-chat') {
        // /child-chat/で始まるすべてのパスをマッチ
        return pathname.startsWith(route)
      }
      // 他のルートは完全一致
      return path === route
    })
  }

  const session = await getSession()

  if (session == null && !isPublicPath(pathname)) {
    throw redirect({
      to: '/auth',
      search: { redirect: pathname }
    })
  }
  
}
*/
