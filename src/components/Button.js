import React from 'react'

export const Button = ({
  children,
  onClick = () => console.log('onClick Default'),
  disabled = false,
  type = 'button',
  classes = '',
  style
}) => (
  <button
    type={type}
    disabled={disabled}
    className={`px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full font-semibold focus:outline-none hover:opacity-90 ${classes}`}
    onClick={onClick}
    style={style}
  >
    {children || 'BUTTON DEFAULT'}
  </button>
)
