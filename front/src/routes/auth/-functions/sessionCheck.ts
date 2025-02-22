import { getSession } from '~/../../clientSupabase/supabase/auth/getSession'
import { useNavigate } from '@tanstack/react-router'
export const useSessionCheck = () => {
  const navigate = useNavigate()

  const sessionCheck = async () => {
    const userSession = await getSession()

    if (userSession === null) {
      return
    }

    navigate({ to: '/home' })
  }

  return { sessionCheck }
}
