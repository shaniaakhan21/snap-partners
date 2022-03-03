import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export const HitsList = ({ children }: IProps) => {
  return (
    <ul className='divide-y divide-gray-200'>{children}</ul>
  )
}
