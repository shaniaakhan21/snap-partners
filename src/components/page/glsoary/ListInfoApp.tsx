export const ListInfoApp = ({ children }) => {
  return (
    <ul className='w-full flex flex-col md:flex-row justify-between items-start mt-4 text-gray-800 gap-y-6'>
      {children}
    </ul>
  )
}
