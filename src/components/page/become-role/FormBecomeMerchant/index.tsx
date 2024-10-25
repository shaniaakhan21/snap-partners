import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { handleFetchError } from 'lib/utils/handleFetchError'
import { updateUserRole } from 'lib/services/user/updateUserRole'
import { becomeMerchantRulesConfig } from './formRules'

import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'
import { SuccessBecomeRole } from '../SuccessBecomeRole'
import { TermsAndConditions } from 'components/page/signup/SignUpForm/FormByRole/utils/TermsAndConditions'
import { IAuth } from 'lib/stores/Auth'

interface IDataFormBecomeMerchant {
  email: string
  username: string
  name: string
  lastname: string
  phoneNumber: string
  ownerName: string
  city: string
  streetName: string
  state: string
  termsAndConditions: boolean
}

export const FormBecomeMerchant = ({ userAuth, userSetAuth }: { userAuth: IAuth, userSetAuth: any }) => {
  const { handleSubmit, reset, register, formState: { errors } } = useForm<IDataFormBecomeMerchant>()
  const [loading, setLoading] = useState(false)
  const [successRole, setSuccessRole] = useState(false)

  const onSubmit = async (dataForm:IDataFormBecomeMerchant) => {
    setLoading(true)

    const dataToSend = {
      name: userAuth.name,
      lastname: 'Merchant',
      email: userAuth.email,
      username: userAuth.username,
      phoneNumber: userAuth.phoneNumber,
      roles: {
        admin: userAuth.roles.admin,
        customer: userAuth.roles.customer,
        driver: userAuth.roles.driver,
        merchant: userAuth.roles.merchant,
        agent: userAuth.roles.agent
      },
      idImage: null,
      insuranceImage: null,
      profileImage: userAuth.profileImage,
      merchant: {
        city: dataForm.city,
        street_name: dataForm.streetName,
        state: dataForm.state,
        country_code: null,
        delivery_fees: 0.01,
        deliverykm: 0.01,
        email: userAuth.email,
        maxdeliverytime: 0.01,
        mobile_no: userAuth.phoneNumber,
        name: userAuth.name,
        password: userAuth.password,
        pincode: '1234',
        save_on_snap: true
      },
      ownerName: dataForm.ownerName,
      becomeToRole: 'merchant'
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
        merchant: true
      }
    })

    reset()
    setLoading(false)
    setSuccessRole(true)
  }

  if (loading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  if (successRole) {
    return (
      <div className='w-full h-85vh flex justify-center items-center'>
        <SuccessBecomeRole roleBecomed='MERCHANT' />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-4xl mx-auto'>
      <section className='w-full max-w-3xl mx-auto flex flex-col md:flex-row justify-center items-center bg-white rounded-md py-4 px-6 gap-4'>
        <h5 className='font-bold text-2xl'>
          Become a Merchant
        </h5>

        <img src='/images/headBecomeMerchant.png' />

        <p>Take back contol of your business.</p>
      </section>

      <br />

      <section className='max-w-xl mx-auto'>
        <div className='text-center'>
          <p className='font-semibold text-lg'>In order to add this roll to your account we need some extra data</p>
        </div>

        <br />

        <label htmlFor='ownerName' className='font-bold text-gray-700 uppercase text-sm'>Merchant Owner Name <span className='text-red-500'>*</span></label>
        {errors.ownerName && <p className='text-sm text-red-400'>{errors.ownerName.message}</p>}
        <input
          id='ownerName'
          name='ownerName'
          type='text'
          {...register('ownerName', becomeMerchantRulesConfig.ownerName)}
          placeholder='Enter Merchant Owner Name'
          className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
        />

        <label htmlFor='city' className='font-bold text-gray-700 uppercase text-sm'>City <span className='text-red-500'>*</span></label>
        {errors.city && <p className='text-sm text-red-400'>{errors.city.message}</p>}
        <input
          id='city'
          name='city'
          type='text'
          placeholder='Enter City'
          {...register('city', becomeMerchantRulesConfig.city)}
          className='w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
        />

        <label htmlFor='streetName' className='font-bold text-gray-700 uppercase text-sm'>Street Name <span className='text-red-500'>*</span></label>
        {errors.streetName && <p className='text-sm text-red-400'>{errors.streetName.message}</p>}
        <input
          id='streetName'
          name='streetName'
          type='text'
          placeholder='Enter Street Name'
          {...register('streetName', becomeMerchantRulesConfig.streetName)}
          className='w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
        />

        <label htmlFor='state' className='font-bold text-gray-700 uppercase text-sm'>State <span className='text-red-500'>*</span></label>
        {errors.state && <p className='text-sm text-red-400'>{errors.state.message}</p>}
        <input
          id='state'
          name='state'
          type='text'
          placeholder='Enter State'
          {...register('state', becomeMerchantRulesConfig.state)}
          className='w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
        />

        <TermsAndConditions
          errors={errors.termsAndConditions}
          register={register}
          rulesForm={becomeMerchantRulesConfig.termsAndConditions}
        />

        <Button type='submit' classes='w-full mt-4'>
        Become a Merchant
        </Button>
      </section>
    </form>
  )
}
