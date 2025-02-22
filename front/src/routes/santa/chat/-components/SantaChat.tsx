import { useEffect, useRef, useState } from 'react'
import { ChatManager } from '~/../../clientSupabase/supabase/realtime/chatManager'
import { getSession } from '~/../../clientSupabase/supabase/auth/getSession'

export default function SantaChat() {
  const chatManagerRef = useRef<ChatManager | null>(null)
  const [sendMessage, setSendMessage] = useState<string>('')
  const [receiveMessages, setReceiveMessages] = useState<string[]>([])

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

  return (
    <div>
      <input type="text" value={sendMessage} onChange={(e) => setSendMessage(e.target.value)} />
      <button onClick={() => chatManagerRef.current?.sendMessage(sendMessage)}>送信</button>

      {receiveMessages.map((ms, i) => {
        return <p key={i}>{ms}</p>
      })}
    </div>
  )
}
