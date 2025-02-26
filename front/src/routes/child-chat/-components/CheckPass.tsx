import toast, { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { PassModal } from './PassModal'
import ChildChat from './ChildChat'

export default function CheckPass() {
  const [passOk, setPassOk] = useState(false)
  const urlParams = new URLSearchParams(window.location.search)
  const room = urlParams.get('id')!

  useEffect(() => {
    (async () => {
      const ok = await PassModal.call({ message: 'パスワードを入力してください', setPassOk, room })
      if (ok) {
        toast.success('認証成功')
        setPassOk(true)
      }
    })()
  }, [room])

  return (
    <>
      <Toaster />
      <PassModal.Root />
      {passOk && <ChildChat passCheck={passOk} />}
    </>
  )
}
