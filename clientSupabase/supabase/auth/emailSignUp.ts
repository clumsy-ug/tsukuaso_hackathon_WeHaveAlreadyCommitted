import { supabase } from '../client.ts'

export const emailSignUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  })
  if (error) {
    return false
  }
  return true
}
