import { supabase } from '../client.ts'

export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (userError) {
      return null
    }

    return user
  } catch (error) {
    return null
  }
}
