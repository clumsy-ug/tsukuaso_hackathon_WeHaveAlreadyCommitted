import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { ChatManager } from '../../../../../clientSupabase/supabase/realtime/chatManager'
import { getSession } from '../../../../../clientSupabase/supabase/auth/getSession'

export const Route = createFileRoute('/santa/chat/')({
  component: RouteComponent
})

function RouteComponent() {
  const chatManagerRef = useRef<ChatManager | null>(null)
  const [sendMessage, setSendMessage] = useState('')
  const [receiveMessages, setReceiveMessages] = useState<string[]>([])

  //初回のみ
  useEffect(() => {
    const connectRealTimeChat = async () => {
      const userSession = await getSession()
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
