import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoProvider from './context/TodoContext'

export default function App() {
  return (
    <div className="max-w-sm mx-auto p-4">
      <TodoProvider>
        <TodoForm />
        <TodoList />
      </TodoProvider>
    </div>
  )
}
