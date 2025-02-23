export class RecognitionVoice {
  private recognition
  private isRecognizing = false
  private shouldRestart = true // onend で再起動するかどうかを管理
  private isResetting = false // reset() 処理中かどうか
  private setSendMessage: (message: string) => void

  constructor(setSendMessage: (message: string) => void) {
    // @ts-expect-error WebSpeechAPI types not available
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      throw new Error('このブラウザは音声認識をサポートしていません')
    }

    this.recognition = new SpeechRecognition()
    this.recognition.lang = 'ja-JP'
    this.recognition.interimResults = true
    this.recognition.continuous = true
    this.setSendMessage = setSendMessage
    this.setupEventListeners()
  }

  private setupEventListeners() {
    this.recognition.onresult = (event: { results: Iterable<unknown> | ArrayLike<unknown> }) => {
      const allText = Array.from(event.results)
        .map((result) => (result as SpeechRecognitionResult)[0].transcript)
        .join('')
      this.setSendMessage(allText)
    }

    this.recognition.onerror = (event: { error: unknown }) => {
      console.error('音声認識エラー:', event.error)
      return
    }

    this.recognition.onend = () => {
      this.isRecognizing = false

      if (this.isResetting) {
        this.isResetting = false
        this.start()
      } else if (this.shouldRestart) {
        this.start()
      }
    }
  }

  start() {
    if (this.isRecognizing) {
      return
    }

    this.shouldRestart = true
    this.recognition.start()
    this.isRecognizing = true
  }

  stop() {
    if (!this.isRecognizing) {
      return
    }

    this.shouldRestart = false
    this.recognition.stop()
  }

  reset() {
    if (this.isRecognizing) {
      this.isResetting = true
      this.stop()
    } else {
      this.start()
    }
  }
}
