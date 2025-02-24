import { supabase } from '../client'
import { getSession } from '../auth/getSession'

export const saveSantaPass = async (password: number): Promise<boolean> => {
  try {
    const userSession = await getSession()

    if (userSession === null) {
      return false
    }

    await supabase
      .from('SantaPassword')
      .insert([
        {
          password: password,
          uid: userSession.id
        }
      ])
      .select()

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const isExistPasswordCheck = async (): Promise<boolean> => {
  try {
    const userSession = await getSession()

    if (userSession === null) {
      return false
    }

    const { data, error } = await supabase
      .from('SantaPassword')
      .select('password')
      .eq('uid', userSession.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // レコードが見つからない場合
        return false
      }
      throw error
    }

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export const verifySantaPass = async (password: number): Promise<boolean> => {
  try {
    const userSession = await getSession()

    if (userSession === null) {
      return false
    }
    const { data, error } = await supabase
      .from('SantaPassword')
      .select('password')
      .eq('uid', userSession.id)
      .single()

    if (data === null) {
      return false
    }

    return data.password === password
  } catch (error) {
    console.error(error)
    return false
  }
}

export const getSantaPass = async (): Promise<number | null> => {
  try {
    const userSession = await getSession()

    if (userSession === null) {
      return null
    }
    const { data } = await supabase
      .from('SantaPassword')
      .select('password')
      .eq('uid', userSession.id)
      .single()

    if (data === null) {
      return null
    }

    return data.password
  } catch (error) {
    console.error(error)
    return null
  }
}

export const toChildCVerifySantaPass = async (password: number, uid: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('SantaPassword')
      .select('password')
      .eq('uid', uid)
      .single()

    if (data === null) {
      return false
    }

    if (error) {
      return false
    }

    return data.password === password
  } catch (error) {
    console.error(error)
    return false
  }
}
