import { use, useState } from "react"
import { RegisterSantaPass } from "./RegisterSantaPass"

// もし4桁passがなかったら新規登録用のボタンを出すコンポーネント
export default function CheckSantaPassExists({ santaPass }: { santaPass: Promise<number | null> }) {
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false)  // 再レンダリング用に作った(本当は作りたくないけど)
  const _santaPass = use(santaPass)

  if (_santaPass) return  // 既に4桁pass登録済みなら強制終了

  const handleClick = async() => {
    await RegisterSantaPass.call({ message: "パスワードを登録してください", setRegisterSuccess })
  }
  
  return (
    <div>
      <RegisterSantaPass.Root />
      {!registerSuccess && <button onClick={handleClick}>4桁パスワード新規登録</button>}
    </div>
  )
}
