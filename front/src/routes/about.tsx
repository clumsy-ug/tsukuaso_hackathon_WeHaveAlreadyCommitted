import { createFileRoute } from '@tanstack/react-router'
import About from './-components/About'
import AboutError from './-components/AboutError'
import AboutPending from './-components/AboutPending'

export const Route = createFileRoute('/about')({
  component: About,
  errorComponent: AboutError,
  pendingComponent: AboutPending
})
