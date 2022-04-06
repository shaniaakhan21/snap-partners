import { ReactNode } from 'react'

export const VideoList = ({ children }: { children: ReactNode }) => (
  <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 justify-center justify-items-center gap-8'>
    {children}
  </ul>
)
