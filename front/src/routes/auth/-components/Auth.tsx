import { ChangeEvent, SyntheticEvent, useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Login from './Login'
import Signup from './Signup'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { emailLogin } from '../../../../../clientSupabase/supabase/auth/emailLogin'
import { emailSignUp } from '../../../../../clientSupabase/supabase/auth/emailSignUp'
import { useNavigate } from '@tanstack/react-router'

export default function Auth() {
  const [mailAddress, setMailAddress] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isMailInputEmpty, setIsMailInputEmpty] = useState<boolean>(false)
  const [isPassInputEmpty, setIsPassInputEmpty] = useState<boolean>(false)
  const [sectionNumber, setSectionNumber] = useState<number>(0) // 0がログイン、1が新規登録
  const navigate = useNavigate()

  const onSectionChange = (_e: SyntheticEvent, newValue: number) => {
    setSectionNumber(newValue)
    setMailAddress('')
    setPassword('')
    setIsMailInputEmpty(false)
    setIsPassInputEmpty(false)
  }

  const onMailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMailAddress(e.target.value)
    if (e.target.value) {
      setIsMailInputEmpty(false)
    }
  }

  const onPassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (e.target.value) {
      setIsPassInputEmpty(false)
    }
  }

  // TextFieldからフォーカスが離れたときに実行する関数
  const onBlurMailInput = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!e.target.value) {
      setIsMailInputEmpty(true)
    }
  }

  const onBlurPassInput = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!e.target.value) {
      setIsPassInputEmpty(true)
    }
  }

  const onLoginSubmit = async () => {
    if (!mailAddress || !password) {
      alert('メールアドレスもしくはパスワードが入力されていません')
      return
    }
    try {
      const flag = await emailLogin(mailAddress, password)
      if (flag) {
        navigate({ to: '/santa/check' }) //TODO後でhomeに変更
      } else {
        alert('ログインに失敗しました')
      }
    } catch (error) {
      console.error('ログインエラー:', error)
    }
  }

  const onSignupSubmit = async () => {
    if (!mailAddress || !password) {
      alert('メールアドレスもしくはパスワードが入力されていません')
      return
    }
    try {
      const flag = await emailSignUp(mailAddress, password)
      if (flag) {
        navigate({ to: '/santa/check' }) //TODO後でhomeに変更
      } else {
        alert('新規登録に失敗しました')
      }
    } catch (error) {
      console.error('ログインエラー:', error)
    }
  }

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh' //正確には縦に対して中央寄せができていない
        }}
      >
        <Card
          sx={{
            width: {
              xs: '90%', // 画面が小さい時
              sm: '400px', // 小型画面
              md: '500px' // 中型画面
            },
            maxWidth: '700px',
            margin: 'auto'
          }}
          variant="outlined"
        >
          <CardContent>
            <Box>
              <Box sx={{ borderBottom: 3, borderColor: 'divider' }}>
                <Tabs value={sectionNumber} onChange={onSectionChange}>
                  <Tab label="ログイン" />
                  <Tab label="新規登録" />
                </Tabs>
              </Box>

              <Login
                sectionNumber={sectionNumber}
                onMailChange={onMailChange}
                onBlurMailInput={onBlurMailInput}
                isMailInputEmpty={isMailInputEmpty}
                onPassChange={onPassChange}
                onBlurPassInput={onBlurPassInput}
                isPassInputEmpty={isPassInputEmpty}
                mailAddress={mailAddress}
                password={password}
                onLoginSubmit={onLoginSubmit}
              />

              <Signup
                sectionNumber={sectionNumber}
                onMailChange={onMailChange}
                onBlurMailInput={onBlurMailInput}
                isMailInputEmpty={isMailInputEmpty}
                onPassChange={onPassChange}
                onBlurPassInput={onBlurPassInput}
                isPassInputEmpty={isPassInputEmpty}
                mailAddress={mailAddress}
                password={password}
                onSignupSubmit={onSignupSubmit}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}
