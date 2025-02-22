import { supabase } from '../client.ts'

export const emailLogin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })
  if (error) {
    return false
  }
  return true
}
