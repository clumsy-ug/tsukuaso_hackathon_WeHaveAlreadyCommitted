import { Link } from "@tanstack/react-router";

export default function Home() {
  return (
    <>
      <div>
        <Link to="/">Home</Link>{' '}
        <Link to="/about">About</Link>
      </div>
      <hr />
    </>
  )
}
