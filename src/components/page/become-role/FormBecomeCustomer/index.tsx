import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { handleFetchError } from 'lib/utils/handleFetchError'
import { updateUserRole } from 'lib/services/user/updateUserRole'
import { becomeCustomerRulesConfig } from './formRules'

import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'
import { TermsAndConditions } from 'components/page/signup/SignUpForm/FormByRole/utils/TermsAndConditions'
import { SuccessBecomeRole } from '../SuccessBecomeRole'

interface IDataFormBecomeCustomer {
  email: string
  username: string
  name: string
  lastname: string
  phoneNumber: string
  termsAndConditions: boolean
}

export const FormBecomeCustomer = ({ userAuth, userSetAuth }) => {
  const { handleSubmit, reset, register, formState: { errors } } = useForm<IDataFormBecomeCustomer>()
  const [loading, setLoading] = useState(false)
  const [successRole, setSuccessRole] = useState(false)

  const onSubmit = async (dataForm: IDataFormBecomeCustomer) => {
    setLoading(true)

    const dataToSend = {
      name: dataForm.name,
      lastname: dataForm.lastname ?? null,
      email: dataForm.email,
      username: dataForm.username,
      phoneNumber: dataForm.phoneNumber,
      roles: {
        admin: userAuth.roles.admin,
        customer: userAuth.roles.customer,
        driver: userAuth.roles.driver,
        merchant: userAuth.roles.merchant
      },
      idImage: null,
      insuranceImage: null,
      merchant: {
        city: null,
        street_name: null,
        state: null,
        country_code: null,
        delivery_fees: 0.01,
        deliverykm: 0.01,
        email: null,
        maxdeliverytime: 0.01,
        mobile_no: null,
        name: null,
        password: userAuth.password,
        pincode: '1234',
        save_on_snap: true
      },
      ownerName: null,
      becomeToRole: 'customer'
    }

    const { error } = await updateUserRole(dataToSend, userAuth.accessToken)

    if (error) {
      handleFetchError(error.status, error.info)
      return
    }

    userSetAuth({
      ...userAuth,
      ranks: { ...userAuth.ranks },
      roles: {
        ...userAuth.roles,
        customer: true
      }
    })

    reset()
    setLoading(false)
    setSuccessRole(true)
  }

  if (loading) {
    return (
      <div className='w-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  if (successRole) {
    return (
      <div className='w-full h-85vh flex justify-center items-center'>
        <SuccessBecomeRole roleBecomed='CUSTOMER' />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl mx-auto'>
      <h5 className='font-bold text-2xl text-primary-500'>Become a Customer</h5>
      <br />

      <label htmlFor='email' className='font-bold text-gray-700 uppercase text-sm'>Email</label>
      {errors.email && <p className='text-sm text-red-400'>{errors.email.message}</p>}
      <input
        id='email'
        name='email'
        type='text'
        defaultValue={userAuth.email}
        {...register('email', becomeCustomerRulesConfig.email)}
        readOnly
        className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
      />

      <label htmlFor='username' className='font-bold text-gray-700 uppercase text-sm'>Username</label>
      {errors.username && <p className='text-sm text-red-400'>{errors.username.message}</p>}
      <input
        id='username'
        name='username'
        type='text'
        defaultValue={userAuth.username}
        {...register('username', becomeCustomerRulesConfig.username)}
        readOnly
        className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
      />

      <label htmlFor='name' className='font-bold text-gray-700 uppercase text-sm'>First Name</label>
      {errors.name && <p className='text-sm text-red-400'>{errors.name.message}</p>}
      <input
        id='name'
        name='name'
        type='text'
        defaultValue={userAuth.name}
        {...register('name', becomeCustomerRulesConfig.name)}
        readOnly
        className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
      />

      {
        userAuth.lastname && (
          <>
            <label htmlFor='name' className='font-bold text-gray-700 uppercase text-sm'>Last Name</label>
            {errors.lastname && <p className='text-sm text-red-400'>{errors.lastname.message}</p>}
            <input
              id='lastname'
              name='lastname'
              type='text'
              defaultValue={userAuth.lastname}
              {...register('lastname', becomeCustomerRulesConfig.lastname)}
              readOnly
              className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
            />
          </>
        )
      }

      <label htmlFor='phoneNumber' className='font-bold text-gray-700 uppercase text-sm'>Phone Number</label>
      {errors.phoneNumber && <p className='text-sm text-red-400'>{errors.phoneNumber.message}</p>}
      <input
        id='phoneNumber'
        name='phoneNumber'
        type='text'
        defaultValue={userAuth.phoneNumber}
        {...register('phoneNumber', becomeCustomerRulesConfig.phoneNumber)}
        readOnly
        className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
      />

      {
        !userAuth.lastname && (
          <>
            <label htmlFor='name' className='font-bold text-gray-700 uppercase text-sm'>Last Name <span className='text-red-500'>*</span></label>
            {errors.lastname && <p className='text-sm text-red-400'>{errors.lastname.message}</p>}
            <input
              id='lastname'
              name='lastname'
              type='text'
              {...register('lastname', becomeCustomerRulesConfig.lastname)}
              className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
            />
          </>
        )
      }

      <TermsAndConditions
        errors={errors.termsAndConditions}
        register={register}
        rulesForm={becomeCustomerRulesConfig.termsAndConditions}
      />

      <Button type='submit' classes='w-full mt-4'>
        Become a Customer
      </Button>
    </form>
  )
}
