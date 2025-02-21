const initialTodos = [
  {
    id: 1,
    content: '掃除する'
  },
  {
    id: 2,
    content: '勉強する'
  },
  {
    id: 3,
    content: '料理する'
  }
]

const TodoList = () => {
  return (
    <div>
      <h2>Todo一覧</h2>
      <ul>
        {initialTodos.map(todo => (
          <li key={todo.id}>
            <p>{todo.id}つ目: {todo.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
