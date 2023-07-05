import {createContext, useContext, useEffect, useReducer} from 'react'
// import ky from 'ky'

const TodoDispatchContext = createContext(undefined)
const TodoStateContext = createContext(undefined)

const initialState = {
  todos: [],
  loaddata: true,
}

const url_api = 'http://127.0.0.1:8000/api'

function reducer(state, payload) {
  switch (payload.type) {
    case 'ADD_TODO': {
      console.log(payload.todos)
      return {
        ...state,
        todos: [
          {
            id: payload.todos.id,
            title: payload.todos.title,
            updated_at: payload.todos.updated_at,
            created_at: payload.todos.created_at,
            completed: payload.todos.completed ?? false,
          },
          ...state.todos,
        ],
        loaddata: false,
      }
    }

    case 'DELETE_TODO': {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload.id),
        loaddata: false,
      }
    }

    case 'TOGGLE_COMPLETE_TODO': {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === payload.id
            ? {
                ...todo,
                completed: !todo.completed,
              }
            : todo
        ),
        loaddata: false,
      }
    }
    case 'ADD_ALL_TODO': {
      return {
        ...state,
        todos: payload.todos,
        loaddata: false,
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${payload.type}`)
    }
  }
}

function initializer(initialState) {
  const todos = JSON.parse(localStorage.getItem('todos'))

  return {
    ...initialState,
    todos: todos ?? [],
  }
}

export default function TodoProvider({children}) {
  //dispatch es una funcion que se encarga de enviar la informacion al reducer
  //para guardar la informacion en el estado
  //dispatch es el state que se invoca al agregar un todo
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    console.log('useEffect Invocado')
    if (state.loaddata === true) {
      const dataFetch = async () => {
        const data = await (await fetch(url_api + '/todos')).json()
        dispatch({
          todos: data,
          type: 'ADD_ALL_TODO',
        })
      }
      dataFetch()
    }
    //localStorage.setItem('todos', JSON.stringify(state.todos))
  }, [state])

  return (
    <TodoDispatchContext.Provider value={dispatch}>
      <TodoStateContext.Provider value={state}>
        {children}
      </TodoStateContext.Provider>
    </TodoDispatchContext.Provider>
  )
}

export function useTodoState() {
  return useContext(TodoStateContext)
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext)
}
