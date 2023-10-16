import { ReactNode, CSSProperties } from 'react'

type ButtonProps = {
  children?: ReactNode
  onClick?: (params: any) => void
  disabled?: boolean
  type?: 'submit' | 'reset' | 'button'
  classes?: String
  style?: CSSProperties
}

export const Button = ({
  children,
  onClick = () => console.log('onClick Default'),
  disabled = false,
  type = 'button',
  classes = '',
  style
}: ButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    className={`px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed -primary text-white bg-primary-500 rounded-full font-semibold focus:outline-none focus:ring focus:ring-primary-300 focus:opacity-90 hover:opacity-90 ${classes}`}
    onClick={onClick}
    style={style}
  >
    {children || 'BUTTON DEFAULT'}
  </button>
)
