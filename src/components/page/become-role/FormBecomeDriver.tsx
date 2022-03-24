import { useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

// import { handleFetchError } from 'lib/utils/handleFetchError'
// import { updateUserRole } from 'lib/services/user/updateUserRole'

import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'

const maxFileSizeInMb = 5

export const FormBecomeDriver = ({ userAuth, userSetAuth }) => {
  const { handleSubmit, reset, register } = useForm()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (dataForm) => {
    setLoading(true)

    if (dataForm.idImage && dataForm.idImage[0].size > (maxFileSizeInMb * 1000000)) {
      // setError('idImage', { message: `The maximum file size in ID Image is ${maxFileSizeInMb}mb, please upload a file with a maximum file size of ${maxFileSizeInMb}mb` })
      toast(`The maximum file size in ID Image is ${maxFileSizeInMb}mb, please upload a file with a maximum file size of ${maxFileSizeInMb}mb`, { type: 'error' })
      setLoading(false)
      return
    }

    if (dataForm.driverLicense && dataForm.driverLicense[0].size > (maxFileSizeInMb * 1000000)) {
      // setError('insuranceImage', { message: `The maximum file size in Driver License is ${maxFileSizeInMb}mb, please upload a file with a maximum file size of ${maxFileSizeInMb}mb` })
      toast(`The maximum file size in Driver License is ${maxFileSizeInMb}mb, please upload a file with a maximum file size of ${maxFileSizeInMb}mb`, { type: 'error' })
      setLoading(false)
      return
    }

    if (dataForm.carInsurance && dataForm.carInsurance[0].size > (maxFileSizeInMb * 1000000)) {
      // setError('carInsurance', { message: `The maximum file size in Car Insurance is ${maxFileSizeInMb}mb, please upload a file with a maximum file size of ${maxFileSizeInMb}mb` })
      toast(`The maximum file size in Car Insurance is ${maxFileSizeInMb}mb, please upload a file with a maximum file size of ${maxFileSizeInMb}mb`, { type: 'error' })
      setLoading(false)
      return
    }

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
      <h5 className='font-bold text-2xl text-primary-500'>
        Become a Driver
      </h5>
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

      <label htmlFor='name' className='font-bold text-gray-700 uppercase text-sm'>First Name</label>
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

      <label htmlFor='idImage' className='font-bold text-gray-700 uppercase text-sm'>ID <span className='text-red-500'>*</span></label>
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

      <label htmlFor='driverLicense' className='font-bold text-gray-700 uppercase text-sm'>Driver License <span className='text-red-500'>*</span></label>
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

      <label htmlFor='carInsurance' className='font-bold text-gray-700 uppercase text-sm'>Insurance Image <span className='text-red-500'>*</span></label>
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

      <Button type='submit' classes='w-full mt-4'>
        Become a Driver
      </Button>
    </form>
  )
}
