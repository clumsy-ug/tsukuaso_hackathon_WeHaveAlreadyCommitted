import {
  isExistPasswordCheck,
  verifySantaPass
} from '~/../../clientSupabase/supabase/santaPass/santaPass'

const handlePassCheck = async (password: number) => {
  const isCheck = await verifySantaPass(password)
  return isCheck
}

const handleIsExistPasswordCheck = async () => {
  const isExistPassword: boolean = await isExistPasswordCheck()
  return isExistPassword
}

export const initConnectCheck = async (password: number) => {
  const isExistPassword = await handleIsExistPasswordCheck()
  if (isExistPassword == false) {
    return false
  }

  const isCheck = await handlePassCheck(password)
  return isCheck
}
