import { use } from "react";
import { PropsType } from "../-types";

export default function ShowInfo({ user, santaPass }: PropsType) {
  const _user = use(user)
  const _santaPass = use(santaPass)

  if (!_user || !_santaPass) {
    return <h1>アカウント情報が取得できませんでした</h1>
  }
  
  return (
    <>
      <p>招待リンク: {`http://localhost:5173/child-chat/${_user.id}`}</p>
      <p>4桁パスワード: {_santaPass}</p>
    </>
  )
}
