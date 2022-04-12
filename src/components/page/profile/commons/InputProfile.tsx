interface IProps {
  inputId: string
  inputType: string
  value?: string
  disabled?: boolean
  labelFor: string
  labelName: string
  placeholder?: string
  error?: any
}

export const InputProfile = ({ inputId, inputType, value, disabled = false, labelFor, labelName, placeholder, error }: IProps) => {
  return (
    <div className='rounded-xl bg-white w-full px-4 py-3 border-y-2 border-y-gray-200 flex flex-col justify-between'>
      {(error) && (
        <p className='text-sm text-red-400'>
          {error && error.message}
        </p>
      )}
      <label htmlFor={labelFor} className='text-sm mb-2'>{labelName}</label>
      <input
        id={inputId}
        name={inputId}
        type={inputType}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full ${disabled ? 'bg-transparent' : 'bg-gray-200'} text-lg rounded py-1 px-2`}
      />
    </div>
  )
}
