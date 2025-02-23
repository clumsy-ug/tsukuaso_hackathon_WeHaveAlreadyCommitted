import { useParams } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { ChatManager } from '../../../../../clientSupabase/supabase/realtime/chatManager'
import { initConnectCheck } from '../-function/passwordManager'
import { RecognitionVoice } from '../-function/recognitionVoice'
import { ThreeMain } from '~/three/threeMain'
import { Box } from '@mui/material'
import MessageWind from './MessageWind'
import InputAction from './InputAction'

export default function ChildChat() {
  const { room } = useParams({ from: '/child-chat/$room/' })

  const chatManagerRef = useRef<ChatManager | null>(null)
  const [sendMessage, setSendMessage] = useState<string>('')
  const [receiveMessages, setReceiveMessages] = useState<{ text: string; sender: string }[]>([])
  const [simplePassword, setSimplePassword] = useState<number | null>(null)

  const threeCanvasRef = useRef<HTMLDivElement>(null)
  const threeMainRef = useRef<ThreeMain | null>(null)
  const recognitionVoiceRef = useRef<RecognitionVoice | null>(null)

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

    return () => {
      if (threeMainRef.current) {
        threeMainRef.current.dispose()
      }
    }
  }, [])

  useEffect(() => {
    recognitionVoiceRef.current = new RecognitionVoice(setSendMessage)
  }, [])

  const handleCheckPassword = async () => {
    if (simplePassword === null) {
      return
    }
    const isResponse = await initConnectCheck(simplePassword, room)
    console.log(isResponse)
    if (isResponse) {
      if (room !== undefined) {
        chatManagerRef.current = new ChatManager(room, setReceiveMessages, false, 'child')
      }
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        ref={threeCanvasRef}
        sx={{
          flex: 1, // 残りのスペースを埋める
          width: '100%',
          minHeight: '50vh'
        }}
      />

      <MessageWind receiveMessages={receiveMessages} />

      <InputAction
        sendMessage={sendMessage}
        setSendMessage={setSendMessage}
        onSendClick={() => chatManagerRef.current?.sendMessage(sendMessage)}
        onMicClick={() => recognitionVoiceRef.current?.reset()}
      />

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
    </Box>
  )
}
