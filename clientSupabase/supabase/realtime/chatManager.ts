import { RealtimeChannel } from '@supabase/supabase-js'
import { supabase } from '../client.ts'

export class ChatManager {
  private channel: RealtimeChannel

  constructor(roomId: string) {
    this.channel = supabase.channel(roomId, {
      config: {
        broadcast: { self: true }
      }
    })

    this.channel
      .on('broadcast', { event: 'new_message' }, (payload) => {
        //setReceiveMassages((prevMassages: any) => [...prevMassages, payload.new.content])
        console.log(payload)
      })
      .subscribe()
  }

  async sendMessage(message: string) {
    try {
      await this.channel.send({
        type: 'broadcast',
        event: 'new_message',
        payload: { message }
      })
    } catch (error) {
      console.error('メッセージ送信エラー:', error)
    }
  }
  disconnect() {
    this.channel.unsubscribe()
  }
}
