export const TopEntitiesGrid = ({ children }) => {
  return (
    <div className='w-full h-fit text-sm grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 grid-flow-row gap-4 mt-4'>
      {children}
    </div>
  )
}
