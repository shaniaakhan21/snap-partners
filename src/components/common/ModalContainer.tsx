export const ModalContainer = ({ children }) => {
  return (
    <div
      className='w-[calc(100vw-20px)] max-w-[500px] max-h-[calc(100vh-60px)] rounded-sm shadow-xl bg-white p-4'
    >
      {children}
    </div>
  )
}
