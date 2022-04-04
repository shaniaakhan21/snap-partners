import { ReactNode } from 'react'

export const TrainingCategoryList = ({ children }: { children: ReactNode }) => (
  <ul className='flex flex-wrap justify-center'>
    {children}
  </ul>
)
