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
    <div className={`relative  ${disabled ? 'flex-col md:flex-row justify-start items-center' : 'flex-col  justify-start items-center text-start'} rounded-xl bg-white w-[100%] px-4 py-3 flex`}>
      {!disabled && error && (
        <p className='text-sm text-red-400'>
          {error && error.message}
        </p>
      )}
      <label htmlFor={labelFor} className={`text-xs md:text-sm ${disabled ? 'text-start w-full md:w-[30%] text-[#708292]' : 'w-full text-start  text-[#706464] mb-1'} `}>{labelName}</label>
      <div className={`relative ${disabled ? ' w-full md:w-[50%]' : 'w-full text-start'} text-start`}>
        <input
          { ...registerValidated }
          id={inputId}
          name={inputId}
          type={`${showPassword ? 'text' : inputType}`}
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          className={` ${disabled ? 'w-full bg-transparent  font-semibold  py-1 px-0 md:px-2' : 'w-[80%] bg-white border-2 border-[#DFDFDF] rounded-lg text-black-h  py-1 px-2'} text-sm md:text-lg rounded`}
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
