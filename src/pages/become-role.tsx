import Head from 'next/head'
// import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import type { ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import { ROLES } from 'config/roles'

import DashboardLayout from 'layouts/private/Dashboard'
import { useAuthStore } from 'lib/stores'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { updateUserRole } from 'lib/services/user/updateUserRole'
import { Button } from 'components/common/Button'

const { SEO } = APP_INFO

const maxFileSizeInMb = 5

const BecomeRolePage = ({ role }: { role: 'CUSTOMER' | 'DRIVER' | 'RESTAURANT' }) => { // check the types
  const { handleSubmit, reset, register } = useForm()
  const { auth, setAuth } = useAuthStore()
  const router = useRouter()

  // useEffect(() => {
  //   const validateRole = role ? auth.roles[role.toLowerCase()] : null

  //   validateRole && router.push('/overview')
  // }, [])

  const onSubmit = async (dataForm) => {
    // if (dataForm.idImage && dataForm.idImage[0].size > (maxFileSizeInMb * 1000000)) {
    //   setError('idImage', { message: `The maximum file size in ID Image is ${maxFileSizeInMb}mb, please upload a file with a maximum file size of ${maxFileSizeInMb}mb` })
    //   setLoading(false)
    //   return
    // }

    // if (dataForm.driverLicense && dataForm.driverLicense[0].size > (maxFileSizeInMb * 1000000)) {
    //   setError('insuranceImage', { message: `The maximum file size in Driver License is ${maxFileSizeInMb}mb, please upload a file with a maximum file size of ${maxFileSizeInMb}mb` })
    //   setLoading(false)
    //   return
    // }

    // if (dataForm.carInsurance && dataForm.carInsurance[0].size > (maxFileSizeInMb * 1000000)) {
    //   setError('carInsurance', { message: `The maximum file size in Car Insurance is ${maxFileSizeInMb}mb, please upload a file with a maximum file size of ${maxFileSizeInMb}mb` })
    //   setLoading(false)
    //   return
    // }

    const { error } = await updateUserRole(dataForm, auth.accessToken)

    if (error) {
      handleFetchError(error.status, error.info)
      return
    }

    setAuth({
      ...auth,
      ranks: { ...auth.ranks },
      roles: { ...auth.roles },
      ...dataForm
    })

    toast(`You are now a ${role}!`, { type: 'success' })
    reset()
    router.push('/overview')
  }

  if (role.toLocaleUpperCase() === 'CUSTOMER' || role.toLocaleUpperCase() === 'DRIVER') {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl mx-auto'>
        <h5 className='font-bold text-2xl text-primary-500'>
          Become a {role === 'CUSTOMER' ? 'Customer' : 'Driver' }
        </h5>
        <br />

        <label htmlFor='email' className='font-bold text-gray-700 uppercase text-sm'>Email</label>
        <input
          id='email'
          name='email'
          type='text'
          defaultValue={auth.email}
          {...register('email')}
          disabled
          className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
        />

        <label htmlFor='username' className='font-bold text-gray-700 uppercase text-sm'>Username</label>
        <input
          id='username'
          name='username'
          type='text'
          defaultValue={auth.username}
          {...register('username')}
          disabled
          className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
        />

        <label htmlFor='name' className='font-bold text-gray-700 uppercase text-sm'>First Name</label>
        <input
          id='name'
          name='name'
          type='text'
          defaultValue={auth.name}
          {...register('name')}
          disabled
          className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
        />

        <label htmlFor='name' className='font-bold text-gray-700 uppercase text-sm'>Last Name</label>
        <input
          id='lastname'
          name='lastname'
          type='text'
          defaultValue={auth.lastname}
          {...register('lastname')}
          disabled
          className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
        />

        <label htmlFor='phoneNumber' className='font-bold text-gray-700 uppercase text-sm'>Phone Number</label>
        <input
          id='phoneNumber'
          name='phoneNumber'
          type='text'
          defaultValue={auth.phoneNumber}
          {...register('phoneNumber')}
          disabled
          className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
        />

        <label htmlFor='idImage' className='font-bold text-gray-700 uppercase text-sm'>ID</label>
        <span className='block text-gray-800 text-sm'>Format JPG, JPEG, PNG, WEBP and PDF Max 5mb</span>
        <input
          id='idImage'
          name='idImage'
          type="file"
          accept=".jpg, .jpeg, .png, .webp, .pdf"
          // {...register(registerId, rulesForm)}
          className="block w-1/2 my-2 text-sm text-slate-500 cursor-pointer
          file:mr-4 file:py-2 file:px-2
          file:rounded-full file:border-0
          file:text-xs file:font-bold file:uppercase
          file:bg-gray-500 file:text-white
          file:w-1/2 hover:file:opacity-90"
        />

        <label htmlFor='driverLicense' className='font-bold text-gray-700 uppercase text-sm'>Driver License</label>
        <span className='block text-gray-800 text-sm'>Format JPG, JPEG, PNG, WEBP and PDF Max 5mb</span>
        <input
          id='driverLicense'
          name='driverLicense'
          type="file"
          accept=".jpg, .jpeg, .png, .webp, .pdf"
          // {...register(registerId, rulesForm)}
          className="block w-1/2 my-2 text-sm text-slate-500 cursor-pointer
          file:mr-4 file:py-2 file:px-2
          file:rounded-full file:border-0
          file:text-xs file:font-bold file:uppercase
          file:bg-gray-500 file:text-white
          file:w-1/2 hover:file:opacity-90"
        />

        <label htmlFor='carInsurance' className='font-bold text-gray-700 uppercase text-sm'>Insurance Image</label>
        <span className='block text-gray-800 text-sm'>Format JPG, JPEG, PNG, WEBP and PDF Max 5mb</span>
        <input
          id='carInsurance'
          name='carInsurance'
          type="file"
          accept=".jpg, .jpeg, .png, .webp, .pdf"
          // {...register(registerId, rulesForm)}
          className="block w-1/2 my-2 text-sm text-slate-500 cursor-pointer
          file:mr-4 file:py-2 file:px-2
          file:rounded-full file:border-0
          file:text-xs file:font-bold file:uppercase
          file:bg-gray-500 file:text-white
          file:w-1/2 hover:file:opacity-90"
        />

        <Button classes='w-full mt-4'>
          Become a <span className='capitalize'>{role.toLocaleLowerCase()}</span>
        </Button>
      </form>
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
        defaultValue={auth.email}
        {...register('email')}
        disabled
        className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
      />

      <label htmlFor='username' className='font-bold text-gray-700 uppercase text-sm'>Username</label>
      <input
        id='username'
        name='username'
        type='text'
        defaultValue={auth.username}
        {...register('username')}
        disabled
        className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
      />

      <label htmlFor='name' className='font-bold text-gray-700 uppercase text-sm'>Restaurant Name</label>
      <input
        id='name'
        name='name'
        type='text'
        defaultValue={auth.name}
        {...register('name')}
        disabled
        className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
      />

      <label htmlFor='name' className='font-bold text-gray-700 uppercase text-sm'>Last Name</label>
      <input
        id='lastname'
        name='lastname'
        type='text'
        defaultValue={auth.lastname}
        {...register('lastname')}
        disabled
        className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
      />

      <label htmlFor='phoneNumber' className='font-bold text-gray-700 uppercase text-sm'>Phone Number</label>
      <input
        id='phoneNumber'
        name='phoneNumber'
        type='text'
        defaultValue={auth.phoneNumber}
        {...register('phoneNumber')}
        disabled
        className='select-none w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
      />

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

      <Button classes='w-full mt-4'>
        Become a Restaurant
      </Button>
    </form>
  )
}

BecomeRolePage.getLayout = (page: ReactNode) => (
  <>
    <Head>
      <title>{SEO.TITLE_PAGE} - Become Role</title>
    </Head>

    <DashboardLayout>
      {page}
    </DashboardLayout>
  </>
)

export const getServerSideProps: GetServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { role } = query
  const validateRole = role ? ROLES[role.toString().toLocaleUpperCase()] : null

  if (!validateRole) {
    return {
      notFound: true
    }
  }

  return {
    props: { role }
  }
}

export default BecomeRolePage
