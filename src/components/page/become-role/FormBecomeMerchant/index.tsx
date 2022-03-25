import { useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

import { handleFetchError } from 'lib/utils/handleFetchError'
import { updateUserRole } from 'lib/services/user/updateUserRole'
import { becomeMerchantRulesConfig } from './formRules'

import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'
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
  const router = useRouter()
  const { handleSubmit, reset, register, formState: { errors } } = useForm<IDataFormBecomeMerchant>()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (dataForm:IDataFormBecomeMerchant) => {
    setLoading(true)

    const dataToSend = {
      name: dataForm.name,
      lastname: 'Merchant',
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
        city: dataForm.city,
        street_name: dataForm.streetName,
        state: dataForm.state,
        country_code: null,
        delivery_fees: 0.01,
        deliverykm: 0.01,
        email: dataForm.email,
        maxdeliverytime: 0.01,
        mobile_no: dataForm.phoneNumber,
        name: dataForm.name,
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
    toast('You are now a Restaurant', { type: 'success' })
    router.push('/overview')
  }

  if (loading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-4xl mx-auto'>
      <section className='w-full max-w-3xl mx-auto flex flex-col md:flex-row justify-center items-center bg-white rounded-md py-4 px-6 gap-4'>
        <h5 className='font-bold text-2xl'>
          Become a Restaurant
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

        <label htmlFor='email' className='font-bold text-gray-700 uppercase text-sm'>Email</label>
        {errors.email && <p className='text-sm text-red-400'>{errors.email.message}</p>}
        <input
          id='email'
          name='email'
          type='text'
          defaultValue={userAuth.email}
          {...register('email', becomeMerchantRulesConfig.email)}
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
          {...register('username', becomeMerchantRulesConfig.username)}
          readOnly
          className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
        />

        <label htmlFor='name' className='font-bold text-gray-700 uppercase text-sm'>Restaurant Name</label>
        {errors.name && <p className='text-sm text-red-400'>{errors.name.message}</p>}
        <input
          id='name'
          name='name'
          type='text'
          defaultValue={userAuth.name}
          {...register('name', becomeMerchantRulesConfig.name)}
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
                {...register('lastname', becomeMerchantRulesConfig.lastname)}
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
          {...register('phoneNumber', becomeMerchantRulesConfig.phoneNumber)}
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
                {...register('lastname', becomeMerchantRulesConfig.lastname)}
                placeholder='Enter Last Name'
                className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
              />
            </>
          )
        }

        <label htmlFor='ownerName' className='font-bold text-gray-700 uppercase text-sm'>Restaurant Owner Name <span className='text-red-500'>*</span></label>
        {errors.ownerName && <p className='text-sm text-red-400'>{errors.ownerName.message}</p>}
        <input
          id='ownerName'
          name='ownerName'
          type='text'
          {...register('ownerName', becomeMerchantRulesConfig.ownerName)}
          placeholder='Enter Restaurant Owner Name'
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
        Become a Restaurant
        </Button>
      </section>
    </form>
  )
}
