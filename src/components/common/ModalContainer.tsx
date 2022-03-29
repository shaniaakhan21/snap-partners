import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export const ModalContainer = ({ children }: IProps) => {
  return (
    <div
      className='w-[calc(100vw-20px)] max-w-[600px] max-h-[calc(85vh-60px)] rounded-sm shadow-xl bg-white p-4 overflow-auto scroll-primary'
    >
      {children}
    </div>
  )
}
