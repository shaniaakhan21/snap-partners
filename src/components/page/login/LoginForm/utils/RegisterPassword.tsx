import { useEffect, useState } from 'react'
import { EyeHiddenIcon, EyeVisibleIcon } from 'components/common/icons'
import { signInRulesConfig } from './formRules'
import { ModalForgotPassword } from './ModalForgotPassword'
import { useModalStore, MODALS_ID } from 'lib/stores/Modal'

interface IInputFormProps {
  register: any,
  errors: any,
}

export const RegisterPassword = ({ register, errors }: IInputFormProps) => {
  const { openModal, addModal } = useModalStore()

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    addModal({
      id: MODALS_ID.MODAL_FORGOT_PASSWORD_ID,
      isOpen: false,
      modalChildren: <ModalForgotPassword />
    })
  }, [])

  return (
    <div>
      <div className='w-full flex justify-between items-center text-sm'>
        <div>
          <label htmlFor='password' className='font-bold text-gray-700 uppercase'>Password</label>
          {errors.password && (
            <p className='text-sm text-red-400'>{errors.password.message}</p>
          )}
        </div>
        <button
          type='button'
          className='text-textAcent-500'
          onClick={() => openModal(MODALS_ID.MODAL_FORGOT_PASSWORD_ID)}
        >
            Forgot Password?
        </button>
      </div>

      <div className='relative'>
        <input
          {...register('password', signInRulesConfig.password)}
          id='password'
          name='password'
          type={`${showPassword ? 'text' : 'password'}`}
          autoComplete='current-password'
          className='w-full pl-3 pr-14 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
          placeholder='Enter Password'
        />
        <div
          onClick={() => setShowPassword((prevState) => !prevState)}
          className='cursor-pointer absolute right-4 mr-0.5 top-3.5 mt-0.5'
        >
          {showPassword ? <EyeHiddenIcon /> : <EyeVisibleIcon />}
        </div>
      </div>
    </div>
  )
}
