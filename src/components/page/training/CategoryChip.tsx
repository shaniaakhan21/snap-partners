import { CSSProperties } from '@mui/styles'
import { MouseEvent, ReactNode } from 'react'

interface IProps {
  id: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  categorySelected: string
  children: ReactNode
  className?: string
}

export const CategoryChip = ({ id, onClick, categorySelected, children, className }: IProps) => {
  const selected = id === categorySelected

  return (
    <li>
      <button
        id={id}
        className={`
          px-10 py-2 transition-colors w-full md:w-fit
          ${selected ? 'bg-primary-500' : 'bg-white'}
          ${selected ? 'text-white' : 'text-[#515151]'}
          ${className || ''}`
        }
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  )
}
