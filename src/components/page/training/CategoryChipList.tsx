import { ReactNode } from 'react'

export const CategoryChipList = ({ children }: { children: ReactNode }) => (
  <ul className='flex flex-wrap justify-center'>
    {children}
  </ul>
)
