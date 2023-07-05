import {forwardRef, useImperativeHandle, useRef} from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export default forwardRef(function TextField({name}, ref) {
  const inputRef = useRef(null)

  useImperativeHandle(
    ref,
    () => {
      return {
        clear() {
          inputRef.current.value = ''
        },
        focus() {
          inputRef.current.focus()
        },
      }
    },
    []
  )

  return (
    <input
      className="border w-full border-gray-200 h-10 px-4 hover:border-gray-300 focus:ring-1 rounded-md"
      name={name}
      ref={inputRef}
      type="text"
    />
  )
})
