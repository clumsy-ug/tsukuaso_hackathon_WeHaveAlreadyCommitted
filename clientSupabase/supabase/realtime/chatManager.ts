import { RealtimeChannel } from '@supabase/supabase-js'
import { supabase } from '../client.ts'

export class ChatManager {
  private channel: RealtimeChannel
  private sender: string

  constructor(
    roomId: string,
    setReceiveMessages: React.Dispatch<
      React.SetStateAction<
        {
          text: string
          sender: string
        }[]
      >
    >,
    selfMs: boolean,
    sender: string
  ) {
    this.sender = sender
    this.channel = supabase.channel(roomId, {
      config: {
        broadcast: { self: selfMs }
      }
    })

    this.channel
      .on('broadcast', { event: 'new_message' }, (payload) => {
        //setReceiveMassages((prevMassages: any) => [...prevMassages, payload.new.content])
        setReceiveMessages((prevMessages) => [
          ...prevMessages,
          {
            text: payload.payload.message,
            sender: payload.payload.sender
          }
        ])
      })
      .subscribe()
  }

  async sendMessage(message: string) {
    try {
      await this.channel.send({
        type: 'broadcast',
        event: 'new_message',
        payload: { message, sender: this.sender }
      })
    } catch (error) {
      console.error('メッセージ送信エラー:', error)
    }
  }
  disconnect() {
    this.channel.unsubscribe()
  }
}
