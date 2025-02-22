import { toChildCVerifySantaPass } from '~/../../clientSupabase/supabase/santaPass/santaPass'

export const initConnectCheck = async (password: number, uid: string) => {
  const isCheck = await toChildCVerifySantaPass(password, uid)
  return isCheck
}
