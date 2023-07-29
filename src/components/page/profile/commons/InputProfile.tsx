// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'

import { EyeHiddenIcon, EyeVisibleIcon } from 'components/common/icons'

type IProps = {
  inputId: string
  inputType: string
  value?: string
  disabled?: boolean
  labelFor: string
  labelName: string
  placeholder?: string
  error?: any
  register?: any
  rules?: any
  isAPasswordInput?: boolean
  defaultValue?: string
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const InputProfile = ({ inputId, inputType, value, disabled = false, labelFor, labelName, placeholder, error, register, rules, isAPasswordInput = false, defaultValue, ...props }: IProps) => {
  const registerValidated = register ? { ...register(inputId, rules ?? null) } : {}

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='relative rounded-xl bg-white w-full px-4 py-3 border-y-2 border-y-gray-200 flex flex-col justify-between'>
      {!disabled && error && (
        <p className='text-sm text-red-400'>
          {error && error.message}
        </p>
      )}
      <label htmlFor={labelFor} className='text-sm mb-2'>{labelName}</label>
      <div className="relative">
        <input
          { ...registerValidated }
          id={inputId}
          name={inputId}
          type={`${showPassword ? 'text' : inputType}`}
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full ${disabled ? 'bg-transparent' : 'bg-gray-200'} text-lg rounded py-1 px-2`}
          {...props}
        />
        {isAPasswordInput && (
          <button
            type='button'
            onClick={() => setShowPassword((prevState) => !prevState)}
            className='absolute right-2 top-1'
          >
            {showPassword ? <EyeHiddenIcon /> : <EyeVisibleIcon />}
          </button>
        )}
      </div>
    </div>
  )
}
