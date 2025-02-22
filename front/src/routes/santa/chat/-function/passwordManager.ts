import {
  isExitPasswordCheck,
  verifySantaPass
} from '~/../../clientSupabase/supabase/santaPass/santaPass'

const handlePassCheck = async (password: number) => {
  const isCheck = await verifySantaPass(password)
  return isCheck
}

const handleIsExitPasswordCheck = async () => {
  const isExitPassword: boolean = await isExitPasswordCheck()
  return isExitPassword
}

export const initConnectCheck = async (password: number) => {
  const isExitPassword = await handleIsExitPasswordCheck()
  if (isExitPassword == false) {
    return false
  }

  const isCheck = await handlePassCheck(password)
  return isCheck
}
