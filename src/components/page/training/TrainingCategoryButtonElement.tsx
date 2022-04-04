import { ReactNode } from 'react'

export const TrainingCategoryButtonElement = ({ children }: { children: ReactNode }) => (
  <li>
    <button className='border border-gray-600 bg-gray-600 bg-opacity-10 text-gray-600 rounded-3xl m-2 px-5 py-1'>
      {children}
    </button>
  </li>
)
