import { MouseEvent, ReactNode } from 'react'

interface IProps {
  id: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  categorySelected: string
  categoryId : number
  children: ReactNode
}

export const CategoryChip = ({ id, onClick, categorySelected, children, categoryId }: IProps) => {
  const selected = id === categorySelected

  return (
    <li>
      <button
        id={id}
        className={`
          border rounded-3xl m-2 px-5 py-1 transition-colors
          ${selected ? 'border-primary-500 ' : 'border-gray-600 bg-opacity-10'} 
          ${selected ? 'bg-primary-500' : 'bg-gray-600'}
          ${selected ? 'text-white' : 'text-gray-600'}
        `}
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  )
}
