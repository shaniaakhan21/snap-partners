import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export const ModalContainer = ({ children }: IProps) => {
  return (
    <div
      className='w-[calc(100vw-20px)] max-w-lg md:max-w-3xl max-h-[calc(85vh-60px)] rounded-2xl shadow-xl bg-white overflow-auto scroll-primary'
    >
      {children}
    </div>
  )
}
