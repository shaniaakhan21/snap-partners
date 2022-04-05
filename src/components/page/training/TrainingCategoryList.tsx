import { ReactNode } from 'react'

export const ListCategoryChip = ({ children }: { children: ReactNode }) => (
  <ul className='flex flex-wrap justify-center'>
    {children}
  </ul>
)
