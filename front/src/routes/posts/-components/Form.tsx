import { ChangeEvent, FormEvent, useState } from "react"

const Form = () => {
  const [newTodo, setNewTodo] = useState<string>("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert(`登録: ${newTodo}`)
    setNewTodo("")
  }

  return (
    <div>
      <h2>新規登録</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="todoを入力"
          value={newTodo}
          onChange={handleChange}
        />
        <button type="submit">登録</button>
      </form>
    </div>
  )
}

export default Form
