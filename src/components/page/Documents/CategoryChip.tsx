import { MouseEvent, ReactNode } from 'react'

interface IProps {
  id: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  categorySelected: string
  categoryId : number
  children: ReactNode
  className?: string
  isLastItem?: boolean
}

export const CategoryChip = ({ id, onClick, categorySelected, children, categoryId, className, isLastItem }: IProps) => {
  const selected = categoryId.toString() === categorySelected

  return (
    <li>
      <button
        id={id}
        className={`
          px-6 py-2 transition-colors w-full md:w-fit
          ${selected ? 'bg-primary-500' : 'bg-white'}
          ${selected ? 'text-white' : 'text-[#515151]'}
          ${isLastItem ? 'rounded-r-3xl' : ''} 
          ${className || ''}`
        }
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  )
}
