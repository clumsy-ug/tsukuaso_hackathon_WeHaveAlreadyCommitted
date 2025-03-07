import { useEffect, useRef, useState } from 'react'
import { ChatManager } from '../../../../../clientSupabase/supabase/realtime/chatManager'
import { RecognitionVoice } from '../-function/recognitionVoice'
import { ThreeMain } from '~/three/threeMain'
import { Box } from '@mui/material'
import MessageWind from './MessageWind'
import InputAction from './InputAction'

export default function ChildChat({ passCheck }: { passCheck: boolean }) {
  const urlParams = new URLSearchParams(window.location.search)
  const room = urlParams.get('id')
  const chatManagerRef = useRef<ChatManager | null>(null)
  const [sendMessage, setSendMessage] = useState<string>('')
  const [receiveMessages, setReceiveMessages] = useState<{ text: string; sender: string }[]>([])

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
    ;(async () => {
      if (passCheck && room !== undefined) {
        if (room) {
          chatManagerRef.current = new ChatManager(room, setReceiveMessages, false, 'child')
        }
      }
    })()
  }, [passCheck, room])

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
        onSendClick={() => {
          chatManagerRef.current?.sendMessage(sendMessage)
          recognitionVoiceRef.current?.reset()
          setSendMessage('')
        }}
        onMicClick={() => recognitionVoiceRef.current?.reset()}
      />
    </Box>
  )
}
