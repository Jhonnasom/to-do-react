import {useRef} from 'react'
import {useTodoDispatch} from '../context/TodoContext'
import Button from '../ui/Button'
import TextField from '../ui/TextField'

export default function TodoForm() {
  const inputRef = useRef(null)
  const dispatch = useTodoDispatch()
  console.log('inputRef: ', inputRef)

  const url_api = 'http://127.0.0.1:8000/api'

  function handleSubmit(e) {
    e.preventDefault()

    const data = new FormData(e.target)

    const title = data.get('title') ?? ''

    if (!title.trim()) {
      return
    }

    const dataFetch = async () => {
      const data = await (
        await fetch(url_api + '/todos', {
          method: 'POST',
          body: JSON.stringify({
            title: title,
          }),
          headers: {'Content-type': 'application/json; charset=UTF-8'},
        })
      ).json()
      console.log('data: ', data)
      dispatch({
        todos: data,
        type: 'ADD_TODO',
      })
    }
    dataFetch()

    inputRef.current.clear()
    inputRef.current.focus()
  }

  return (
    <form className="flex gap-x-2 items-center" onSubmit={handleSubmit}>
      <TextField name="title" ref={inputRef} />
      <Button className="shrink-0">Save Todo</Button>
    </form>
  )
}
