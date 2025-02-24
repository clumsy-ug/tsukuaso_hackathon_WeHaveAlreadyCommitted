import { useEffect, useState } from 'react'
import { PassModal } from './PassModal'
import ChildChat from './ChildChat'

export default function CheckPass() {
  const [passOk, setPassOk] = useState(false)

  useEffect(() => {
    (async () => {
      const ok = await PassModal.call({ message: 'パスワードを入力してください', setPassOk })
      if (ok) {
        setPassOk(true)
      }
    })()
  }, [])

  return (
    <>
      <PassModal.Root />
      {passOk && <ChildChat passCheck={passOk} />}
    </>
  )
}
