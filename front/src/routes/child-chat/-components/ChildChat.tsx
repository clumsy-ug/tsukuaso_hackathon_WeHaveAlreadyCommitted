import { useParams } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { ChatManager } from '../../../../../clientSupabase/supabase/realtime/chatManager'
import { initConnectCheck } from '../-function/passwordManager'
import { ThreeMain } from '~/three/threeMain'

export default function ChildChat() {
  const { room } = useParams({ from: '/child-chat/$room/' })

  const chatManagerRef = useRef<ChatManager | null>(null)
  const [sendMessage, setSendMessage] = useState<string>('')
  const [receiveMessages, setReceiveMessages] = useState<string[]>([])
  const [simplePassword, setSimplePassword] = useState<number | null>(null)

  const threeCanvasRef = useRef<HTMLDivElement>(null)
  const threeMainRef = useRef<ThreeMain | null>(null)

  useEffect(() => {
    // 開発者モードだと２回呼ばれる対策
    if (threeMainRef.current) {
      threeMainRef.current.dispose()
      threeMainRef.current = null
    }

    if (threeCanvasRef.current) {
      console.log('Initializing new instance')
      threeMainRef.current = new ThreeMain(threeCanvasRef.current)
    }

    // クリーンアップ関数
    return () => {
      if (threeMainRef.current) {
        threeMainRef.current.dispose()
      }
    }
  }, [])

  const handleCheckPassword = async () => {
    if (simplePassword === null) {
      return
    }
    const isResponse = await initConnectCheck(simplePassword, room)
    console.log(isResponse)
    if (isResponse) {
      if (room !== undefined) {
        chatManagerRef.current = new ChatManager(room, setReceiveMessages, false)
      }
    }
  }

  const handleClick = () => {
    alert('音声認識スタート！')
  }

  return (
    <>
      <h1>サンタの画像</h1>

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

      <div ref={threeCanvasRef} style={{ width: '50vw', height: '70vh' }} />

      <input
        type="text"
        placeholder="サンタとのメッセージ"
        value={sendMessage}
        onChange={(e) => setSendMessage(e.target.value)}
      />
      <button onClick={() => chatManagerRef.current?.sendMessage(sendMessage)}>送信</button>

      <br />
      <button onClick={handleClick}>音声認識ボタン</button>
      {receiveMessages.map((ms, i) => {
        return <p key={i}>{ms}</p>
      })}
    </>
  )
}
