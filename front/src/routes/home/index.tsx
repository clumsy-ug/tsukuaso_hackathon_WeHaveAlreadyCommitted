import { createFileRoute } from '@tanstack/react-router'
import Home from './-components/Home'
import HomePending from './-components/HomePending'
import HomeError from './-components/HomeError'

export const Route = createFileRoute('/home/')({
  component: Home,
  pendingComponent: HomePending,
  errorComponent: HomeError
})
