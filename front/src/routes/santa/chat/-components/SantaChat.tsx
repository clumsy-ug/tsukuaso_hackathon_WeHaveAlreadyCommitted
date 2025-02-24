import { useEffect, useRef, useState } from 'react'
import { ChatManager } from '~/../../clientSupabase/supabase/realtime/chatManager'
import { getSession } from '~/../../clientSupabase/supabase/auth/getSession'

import { Box, Card } from '@mui/material'
import ReceiveMessage from './ReceiveMessage'
import InputAction from './InputAction'

export default function SantaChat() {
  const chatManagerRef = useRef<ChatManager | null>(null)
  const [sendMessage, setSendMessage] = useState<string>('')
  const [receiveMessages, setReceiveMessages] = useState<{ text: string; sender: string }[]>([])

  useEffect(() => {
    (async () => {
      const userSession = await getSession()

      if (userSession && userSession.id) {
        chatManagerRef.current = new ChatManager(userSession.id, setReceiveMessages, true, 'santa')
      }
    })()
  }, [])

  return (
    <Box
      sx={{
        width: '100%',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#fafafa'
      }}
    >
      <Card
        sx={{
          width: { xs: '95%', sm: '80%', md: '60%' },
          height: { xs: '95%', sm: '80%' },
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          boxShadow: 3
        }}
      >
        <ReceiveMessage receiveMessages={receiveMessages} />

        <InputAction
          sendMessage={sendMessage}
          setSendMessage={setSendMessage}
          onSendClick={() => chatManagerRef.current?.sendMessage(sendMessage)}
        />
      </Card>
    </Box>
  )
}
