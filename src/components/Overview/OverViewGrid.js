import React from 'react'

export const OverViewGrid = ({ children }) => {
  return (
    <div className='w-full h-fit max-w-6xl mx-auto text-sm grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row md:grid-rows-2 gap-4 mt-4'>
      {children}
    </div>
  )
}
