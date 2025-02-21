import { supabase } from '../client.ts'

export const emailLogin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })
  if (error) {
    throw new Error(error.message)
  }
  alert('ログイン成功')
  console.log(data)
}
