import { Confirm } from "./Confirm"

export default function ReactCall() {
  const handleCall = async() => {
    const accepted = await Confirm.call({ message: 'パスワードを入力してください' })
    if (accepted) {
      alert('yesが押された')
    } else {
      alert('noが押された')
    }
  }

  return (
    <>
      <Confirm.Root />
      <button onClick={handleCall}>コール開始</button>
    </>
  )
}
