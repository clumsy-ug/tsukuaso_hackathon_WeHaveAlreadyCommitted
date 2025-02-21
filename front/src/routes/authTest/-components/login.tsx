import { useState } from 'react'
import { emailLogin } from '../../../../../clientSupabase/supabase/auth/emailLogin'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      await emailLogin(email, password)
    } catch (error) {
      console.error('ログインエラー:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          メールアドレス
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>

      <div>
        <label>
          パスワード
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>

      <button type="submit">ログイン</button>
    </form>
  )
}

export default Login
