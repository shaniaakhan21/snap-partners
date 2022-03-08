import { useState } from 'react'
// import { InputForm } from './utils/Input'
// import { InputPhone } from './utils/InputPhone'

const InputSelected = ({ register, errors, typeInput }: { register: any, errors: any, typeInput: 'phone' | 'email' | 'username' }) => {
  const handleOnlyNumbers = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault()
    }
  }

  if (typeInput === 'phone') {
    return (
      <div>
        <label htmlFor='phone' className='font-bold text-gray-700 uppercase text-sm'>
        Phone
        </label>

        {(errors.credentialProvider) && (
          <p className='text-sm text-red-400'>
            {errors.credentialProvider && errors.credentialProvider.message}
          </p>
        )}

        <div className='w-full flex justify-start items-center gap-x-2'>
          <input
            {...register('credentialProvider', { required: { value: true, message: 'Phone number is required *' } })}
            id='credentialProvider'
            name='credentialProvider'
            type='tel'
            className='w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
            placeholder='+15555555555'
            maxLength={12}
            onKeyPress={handleOnlyNumbers}
            autoComplete='off'
          />
        </div>
      </div>
    )
  }

  if (typeInput === 'username') {
    return (
      <div>
        <label htmlFor='credentialProvider' className='font-bold text-gray-700 uppercase text-sm'>Username</label>
        {errors.credentialProvider && <p className='text-sm text-red-400'>{errors.credentialProvider.message}</p>}

        <input
          {...register('credentialProvider', {
            required: { value: true, message: 'Username Required *' },
            maxLength: { value: 50, message: 'Max 50 Characters *' },
            minLength: { value: 3, message: 'Min 3 Characters *' },
            pattern: { value: /^[a-zA-Z0-9!@#$%\\^&*)(+=._-]*$/, message: 'Username not allow *' }
          })}
          className={'w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'}
          id='credentialProvider'
          name='credentialProvider'
          type='text'
          placeholder='Enter Username'
          autoComplete='username'
        />
      </div>
    )
  }

  if (typeInput === 'email') {
    return (
      <div>
        <label htmlFor='credentialProvider' className='font-bold text-gray-700 uppercase text-sm'>Email</label>
        {errors.credentialProvider && <p className='text-sm text-red-400'>{errors.credentialProvider.message}</p>}

        <input
          {...register('credentialProvider', {
            required: { value: true, message: 'Email Required *' },
            pattern: {
              value:
                /^\S[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'Enter a valid email *'
            }
          })}
          className={'w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'}
          id='credentialProvider'
          name='credentialProvider'
          type='email'
          placeholder='Enter Email'
          autoComplete='email'
        />
      </div>
    )
  }

  return (
    <div>
      <label htmlFor='phone' className='font-bold text-gray-700 uppercase text-sm'>
        Phone
      </label>

      {(errors.credentialProvider) && (
        <p className='text-sm text-red-400'>
          {errors.credentialProvider && errors.credentialProvider.message}
        </p>
      )}

      <div className='w-full flex justify-start items-center gap-x-2'>
        <input
          {...register('credentialProvider', { required: { value: true, message: 'Phone number is required *' } })}
          id='reset'
          name='credentialProvider'
          type='tel'
          className='w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
          placeholder='+15555555555'
          maxLength={12}
          onKeyPress={handleOnlyNumbers}
          autoComplete='off'
        />
      </div>
    </div>
  )
}

export const DynamicInput = ({ register, errors, reset }: { register: any, errors: any, reset: any }) => {
  const [typeInput, setTypeInput] = useState<'phone' | 'email' | 'username'>('phone')

  return (
    <div>
      <div className='w-full flex justify-between items-center'>
        <button
          type='button'
          onClick={() => { setTypeInput('phone'); reset({ credentialProvider: '' }) }}
          className={`${typeInput === 'phone' && 'bg-primary-500 rounded-md text-white'} px-4 py-1 font-semibold select-none`}
        >
          Phone
        </button>
        <button
          type='button'
          onClick={() => { setTypeInput('email'); reset({ credentialProvider: '' }) }}
          className={`${typeInput === 'email' && 'bg-primary-500 rounded-md text-white'} px-4 py-1 font-semibold select-none`}
        >
          Email
        </button>
        <button
          type='button'
          onClick={() => { setTypeInput('username'); reset({ credentialProvider: '' }) }}
          className={`${typeInput === 'username' && 'bg-primary-500 rounded-md text-white'} px-4 py-1 font-semibold select-none`}
        >
          Username
        </button>
      </div>

      <div className='mt-4'>
        <InputSelected typeInput={typeInput} register={register} errors={errors} />
      </div>
    </div>
  )
}
