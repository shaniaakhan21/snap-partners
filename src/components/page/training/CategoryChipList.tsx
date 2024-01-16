import { ReactNode } from 'react'

export const CategoryChipList = ({ children }: { children: ReactNode }) => (
  <div className='flex justify-center'>
    <ul className='flex flex-col md:flex-row flex-nowrap md:flex-wrap justify-center w-fit  shadow-[0_1px_17px_-1px_rgba(0,0,0,0.2)] md:rounded-3xl bg-white'>
      {children}
    </ul>
  </div>
)
