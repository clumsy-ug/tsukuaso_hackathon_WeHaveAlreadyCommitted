import { use } from "react";
import { PropsType } from "../-types";

export default function ShowInfo({ user, santaPass }: PropsType) {
  const _user = use(user)
  const _santaPass = use(santaPass)

  if (!_user) {
    return <h1>ユーザー認証に失敗しました</h1>
  }

  if (!_santaPass) return
  
  return (
    <>
      <p>招待リンク: {`http://localhost:5173/child-chat/${_user.id}`}</p>
      <p>4桁パスワード: {_santaPass}</p>
    </>
  )
}
