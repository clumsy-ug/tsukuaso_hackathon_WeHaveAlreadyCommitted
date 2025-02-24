import { supabase } from '../client.ts'

export const logout = async (): Promise<boolean> => {
  const { error } = await supabase.auth.signOut()
  if (error) return false
  return true
}
