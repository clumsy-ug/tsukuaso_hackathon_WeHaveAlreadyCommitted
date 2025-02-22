import { useParams } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { ChatManager } from '../../../../../clientSupabase/supabase/realtime/chatManager'

export default function ChildChat() {
  const { room } = useParams({ from: '/child-chat/$room/' })

  const chatManagerRef = useRef<ChatManager | null>(null)
  const [sendMessage, setSendMessage] = useState<string>('')
  const [receiveMessages, setReceiveMessages] = useState<string[]>([])

  useEffect(() => {
    //TODO4桁パス確認
    const connectRealTimeChat = async () => {
      if (room !== undefined) {
        chatManagerRef.current = new ChatManager(room, setReceiveMessages, true)
      }
    }
    connectRealTimeChat()
  }, [room])

  const handleClick = () => {
    alert('音声認識スタート！')
  }

  return (
    <>
      <h1>サンタの画像</h1>
      <input type="text" placeholder="サンタとのメッセージ" />
      <button onClick={handleClick}>音声認識ボタン</button>

      <input type="text" value={sendMessage} onChange={(e) => setSendMessage(e.target.value)} />
      <button onClick={() => chatManagerRef.current?.sendMessage(sendMessage)}>送信</button>

      {receiveMessages.map((ms, i) => {
        return <p key={i}>{ms}</p>
      })}
    </>
  )
}
