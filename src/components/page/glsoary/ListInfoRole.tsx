export const ListInfoRole = ({ children }) => {
  return (
    <ul className='w-full flex flex-col md:flex-row justify-between items-start md:items-end text-gray-800 mt-4 gap-y-6'>
      {children}
    </ul>
  )
}
