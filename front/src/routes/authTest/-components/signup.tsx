import { useState } from 'react'
import { emailSignUp } from '~/service/supabase/auth/emailSignUp'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      await emailSignUp(email, password)
    } catch (error) {
      console.error('新規登録エラー:', error)
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

      <button type="submit">新規登録</button>
    </form>
  )
}

export default Signup
