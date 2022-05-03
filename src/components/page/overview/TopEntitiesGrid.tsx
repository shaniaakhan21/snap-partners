export const TopEntitiesGrid = ({ children }) => {
  return (
    <div className='w-full h-fit text-sm grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 grid-flow-row gap-4 mt-4'>
      {children}
    </div>
  )
}
