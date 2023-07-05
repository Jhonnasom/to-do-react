import {useTodoState} from '../context/TodoContext'
import TodoItem from './TodoItem'

export default function TodoList() {
  const {todos} = useTodoState()

  return (
    <div className="gap-y-2 flex flex-col mt-4 bg-slate-400">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
