import { useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

// import { handleFetchError } from 'lib/utils/handleFetchError'
// import { updateUserRole } from 'lib/services/user/updateUserRole'

import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'

export const FormBecomeMerchant = ({ userAuth, userSetAuth }) => {
  const { handleSubmit, reset, register } = useForm()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (dataForm) => {
    setLoading(true)

    console.log(dataForm)

    // const { error } = await updateUserRole(dataForm, auth.accessToken)

    // if (error) {
    //   handleFetchError(error.status, error.info)
    //   return
    // }

    // userSetAuth({
    //   ...auth,
    //   ranks: { ...auth.ranks },
    //   roles: { ...auth.roles },
    //   ...dataForm
    // })

    reset()
    setLoading(false)
    toast('You are now a Restaurant', { type: 'success' })
    // router.push('/overview')
  }

  if (loading) {
    return (
      <div className='w-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl mx-auto'>
      <h5 className='font-bold text-2xl text-primary-500'>Become a Restaurant</h5>
      <br />

      <label htmlFor='email' className='font-bold text-gray-700 uppercase text-sm'>Email</label>
      <input
        id='email'
        name='email'
        type='text'
        defaultValue={userAuth.email}
        {...register('email')}
        disabled
        className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
      />

      <label htmlFor='username' className='font-bold text-gray-700 uppercase text-sm'>Username</label>
      <input
        id='username'
        name='username'
        type='text'
        defaultValue={userAuth.username}
        {...register('username')}
        disabled
        className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
      />

      <label htmlFor='name' className='font-bold text-gray-700 uppercase text-sm'>Restaurant Name</label>
      <input
        id='name'
        name='name'
        type='text'
        defaultValue={userAuth.name}
        {...register('name')}
        disabled
        className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
      />

      {
        userAuth.lastname && (
          <>
            <label htmlFor='name' className='font-bold text-gray-700 uppercase text-sm'>Last Name</label>
            <input
              id='lastname'
              name='lastname'
              type='text'
              defaultValue={userAuth.lastname}
              {...register('lastname')}
              disabled
              className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
            />
          </>
        )
      }

      <label htmlFor='phoneNumber' className='font-bold text-gray-700 uppercase text-sm'>Phone Number</label>
      <input
        id='phoneNumber'
        name='phoneNumber'
        type='text'
        defaultValue={userAuth.phoneNumber}
        {...register('phoneNumber')}
        disabled
        className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
      />

      {
        !userAuth.lastname && (
          <>
            <label htmlFor='name' className='font-bold text-gray-700 uppercase text-sm'>Last Name <span className='text-red-500'>*</span></label>
            <input
              id='lastname'
              name='lastname'
              type='text'
              {...register('lastname')}
              className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
            />
          </>
        )
      }

      <label htmlFor='ownerName' className='font-bold text-gray-700 uppercase text-sm'>Restaurant Owner Name <span className='text-red-500'>*</span></label>
      <input
        id='ownerName'
        name='ownerName'
        type='text'
        {...register('ownerName')}
        placeholder='Enter Restaurant Owner Name'
        className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
      />

      <label htmlFor='city' className='font-bold text-gray-700 uppercase text-sm'>City <span className='text-red-500'>*</span></label>
      <input
        id='city'
        name='city'
        type='text'
        placeholder='Enter City'
        className='w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
      />

      <label htmlFor='streetName' className='font-bold text-gray-700 uppercase text-sm'>Street Name <span className='text-red-500'>*</span></label>
      <input
        id='streetName'
        name='streetName'
        type='text'
        placeholder='Enter Street Name'
        className='w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
      />

      <label htmlFor='state' className='font-bold text-gray-700 uppercase text-sm'>State <span className='text-red-500'>*</span></label>
      <input
        id='state'
        name='state'
        type='text'
        placeholder='Enter State'
        className='w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
      />

      <Button type='submit' classes='w-full mt-4'>
      Become a Restaurant
      </Button>
    </form>
  )
}
