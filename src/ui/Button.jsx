export default function Button({className, children, onClick}) {
  return (
    <button
      className={`text-white h-10 flex items-center bg-gray-600 hover:bg-gray-500 px-4 rounded-md ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
