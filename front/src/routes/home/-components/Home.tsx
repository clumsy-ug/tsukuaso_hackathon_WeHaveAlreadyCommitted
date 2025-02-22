import { Link } from "@tanstack/react-router";

export default function Home() {
  return (
    <>
      <Link to="/child-chat">サンタさんと話す</Link>
      <br />
      <Link to="/manage/check">管理者画面へ</Link>
    </>
  )
}
