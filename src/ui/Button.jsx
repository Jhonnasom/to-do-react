export default function Button({className, children, onClick}) {
  return (
    <button
      className={`h-10 flex items-center bg-green-600 hover:bg-green-500 px-4 rounded-md ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
