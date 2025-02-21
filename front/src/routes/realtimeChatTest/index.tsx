import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { ChatManager } from '../../../../clientSupabase/supabase/realtime/chatManager'

export const Route = createFileRoute('/realtimeChatTest/')({
  component: RouteComponent
})

function RouteComponent() {
  const chatManagerRef = useRef<ChatManager | null>(null)
  const [message, setMessage] = useState('')
  useEffect(() => {
    chatManagerRef.current = new ChatManager('test')
  }, [])
  return (
    <div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => chatManagerRef.current?.sendMessage(message)}>送信</button>
    </div>
  )
}
