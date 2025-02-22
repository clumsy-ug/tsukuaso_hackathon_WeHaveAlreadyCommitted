import { useEffect, useRef, useState } from 'react'
import { ChatManager } from '~/../../clientSupabase/supabase/realtime/chatManager'
import { getSession } from '~/../../clientSupabase/supabase/auth/getSession'
import { initConnectCheck } from '../-function/passwordManager'

export default function SantaChat() {
  const chatManagerRef = useRef<ChatManager | null>(null)
  const [sendMessage, setSendMessage] = useState<string>('')
  const [receiveMessages, setReceiveMessages] = useState<string[]>([])
  const [simplePassword, setSimplePassword] = useState<number | null>(null)
  useEffect(() => {
    const connectRealTimeChat = async () => {
      const userSession = await getSession()

      //TODO後で消す
      console.log(userSession!.id)
      if (userSession && userSession.id) {
        chatManagerRef.current = new ChatManager(userSession.id, setReceiveMessages, true)
      }
    }
    connectRealTimeChat()
  }, [])

  const handleCheckPassword = async () => {
    if (simplePassword === null) {
      return
    }
    const isResponse = await initConnectCheck(simplePassword)
    alert(isResponse ? '認証成功' : '認証失敗')
  }

  return (
    <div>
      <input
        placeholder="招待コード４桁"
        type="number"
        value={simplePassword ?? ''}
        onChange={(e) => {
          // 数字のみを許可
          if (
            e.target.value === '' ||
            (/^\d+$/.test(e.target.value) && e.target.value.length <= 4)
          ) {
            setSimplePassword(e.target.value === '' ? null : Number(e.target.value))
          }
        }}
      ></input>
      <button onClick={handleCheckPassword}>招待コード確認</button>
      <br />
      <input type="text" value={sendMessage} onChange={(e) => setSendMessage(e.target.value)} />
      <button onClick={() => chatManagerRef.current?.sendMessage(sendMessage)}>送信</button>
      {receiveMessages.map((ms, i) => {
        return <p key={i}>{ms}</p>
      })}
    </div>
  )
}
