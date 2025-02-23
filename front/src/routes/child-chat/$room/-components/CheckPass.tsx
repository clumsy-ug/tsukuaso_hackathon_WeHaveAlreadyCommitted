import { useEffect, useState } from 'react'
import { PassModal } from './PassModal'
import ChildChat from './ChildChat'

export default function CheckPass() {
  const [passOk, setPassOk] = useState(false)

  useEffect(() => {
    const initialFunc = async () => {
      const ok = await PassModal.call({ message: 'パスワードを入力してください', setPassOk })
      if (ok) {
        setPassOk(true)
      }
    }
    initialFunc()
  }, [])

  return (
    <>
      <PassModal.Root />
      {passOk && <ChildChat passCheck={passOk} />}
    </>
  )
}
