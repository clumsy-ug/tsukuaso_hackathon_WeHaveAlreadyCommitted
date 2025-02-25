import toast, { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { PassModal } from './PassModal'
import ChildChat from './ChildChat'

export default function CheckPass() {
  const [passOk, setPassOk] = useState(false)

  useEffect(() => {
    (async () => {
      const ok = await PassModal.call({ message: 'パスワードを入力してください', setPassOk })
      if (ok) {
        toast.success('認証成功')
        setPassOk(true)
      }
    })()
  }, [])

  return (
    <>
      <Toaster />
      <PassModal.Root />
      {passOk && <ChildChat passCheck={passOk} />}
    </>
  )
}
