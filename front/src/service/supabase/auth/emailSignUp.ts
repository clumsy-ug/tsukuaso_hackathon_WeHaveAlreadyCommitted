import { supabase } from '../client.ts'

export const emailSignUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  })
  if (error) {
    throw new Error(error.message)
  }
  alert('登録成功')
  console.log(data)
}
