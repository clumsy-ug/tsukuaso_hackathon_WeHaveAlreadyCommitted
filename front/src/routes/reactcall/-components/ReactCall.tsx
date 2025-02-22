import { useEffect } from "react"
import { Confirm } from "./Confirm"

export default function ReactCall() {
  useEffect(() => {
    async function waitConfirm() {
      const accepted = await Confirm.call({ message: 'Continue?' })
      if (accepted) {
        alert('yesが押された')
      } else {
        alert('noが押された')
      }
    }
    waitConfirm()
  }, [])

  return (
    <>
      <Confirm.Root />
    </>
  )
}
