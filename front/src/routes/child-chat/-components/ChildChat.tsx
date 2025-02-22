export default function ChildChat() {
  const handleClick = () => {
    alert('音声認識スタート！')
  }

  return (
    <>
      <h1>サンタの画像</h1>
      <input type="text" placeholder="サンタとのメッセージ" />
      <button onClick={handleClick}>音声認識ボタン</button>
    </>
  )
}
