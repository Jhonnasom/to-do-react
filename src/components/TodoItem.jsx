import {memo} from 'react'

import {useTodoDispatch} from '../context/TodoContext'
import Button from '../ui/Button'

// eslint-disable-next-line react-refresh/only-export-components
export default memo(function TodoItem({todo}) {
  const dispatch = useTodoDispatch()

  const url_api = 'http://127.0.0.1:8000/api'

  function handleChange() {
    const dataFetch = async () => {
      await fetch(url_api + '/todos/' + todo.id, {
        method: 'PUT',
        body: JSON.stringify({
          completed: !todo.completed,
        }),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
      })

      dispatch({
        id: todo.id,
        type: 'TOGGLE_COMPLETE_TODO',
      })
    }
    dataFetch()
  }

  function handleDelete() {
    const dataFetch = async () => {
      await fetch(url_api + '/todos/' + todo.id, {
        method: 'DELETE',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
      })

      dispatch({
        id: todo.id,
        type: 'DELETE_TODO',
      })
    }
    dataFetch()
  }

  return (
    <div className="flex items-center gap-x-2">
      <input checked={todo.completed} onChange={handleChange} type="checkbox" />
      <h1 className="flex-1">{todo.title}</h1>
      <Button
        className="bg-gray-600 h-6 hover:bg-gray-500 text-sm text-white "
        onClick={handleDelete}
        type="button"
      >
        Delete
      </Button>
    </div>
  )
})
