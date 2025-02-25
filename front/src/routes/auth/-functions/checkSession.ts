import { redirect } from "@tanstack/react-router"
import { getSession } from "~/../../clientSupabase/supabase/auth/getSession"

export const checkSession = async () => {
  const isLoggedIn = await getSession()
  if (isLoggedIn) {
    throw redirect({ to: '/home' })
  }
}
