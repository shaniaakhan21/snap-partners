export const ListDeviceLinkApp = ({ children }) => {
  return (
    <ul className='flex flex-col md:flex-row justify-between items-start mt-10 gap-x-28 gap-y-11'>
      {children}
    </ul>
  )
}
