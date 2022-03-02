interface IProps {
  id?: string
  registerId: string
  rulesForm: any
  register: any
  isRequired?: boolean
  label?: string
  errors?: any
}

export const InputFile = ({ id, registerId, rulesForm, register, isRequired, label, errors }: IProps) => {
  console.log('ERRORS:', errors)

  return (
    <div>
      <label htmlFor={id} className='font-bold text-gray-700 uppercase text-sm'>
        {label} {' '}
        {
          isRequired
            ? <span className='text-red-500'>*</span>
            : <span className='text-xs text-gray-600 capitalize font-normal'>(Is Optional)</span>
        }
      </label>
      {errors && <p className='text-sm text-red-400'>{errors.message}</p>}

      <input
        type="file"
        accept="image/png, image/webp, image/jpeg"
        {...register(registerId, rulesForm)}
        className="block w-full my-2 px-3 text-sm text-slate-500 cursor-pointer
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-primary-500 file:text-white
        file:w-1/2 hover:file:opacity-90
      "/>
    </div>
  )
}
