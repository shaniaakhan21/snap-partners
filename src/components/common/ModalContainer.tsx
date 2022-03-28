import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export const ModalContainer = ({ children }: IProps) => {
  return (
    <div
      className='w-[calc(100vw-20px)] max-w-[600px] max-h-[calc(100vh-60px)] rounded-sm shadow-xl bg-white p-4'
    >
      {children}
    </div>
  )
}
