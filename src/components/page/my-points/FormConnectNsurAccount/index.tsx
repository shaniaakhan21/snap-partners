import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useState } from 'react'

// import { connectNsurAccount } from 'lib/services/nsur/connectNsurAccount'
// import { handleFetchError } from 'lib/utils/handleFetchError'
import { IAuth, TSetAuth } from 'lib/stores/Auth'

import { CheckTermsAndConditions } from 'components/common/CheckTermsAndConditions'
import { InputBasicForm } from 'components/common/InputBasicForm'
import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'

interface IDataFormConnectNsurAccount {
  email: string
  username: string
  termsAndConditions: boolean
}

interface IFormConnectNsurAccountProps {
  auth: IAuth
  setAuth: TSetAuth
}

export const FormConnectNsurAccount = ({ auth, setAuth }: IFormConnectNsurAccountProps) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IDataFormConnectNsurAccount>()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (dataForm: IDataFormConnectNsurAccount) => {
    setLoading(true)
    // const { data, error } = await connectNsurAccount(dataForm.email, dataForm.username)

    // if (error) {
    //   handleFetchError(error.status, error.info)
    //   setLoading(false)
    //   return
    // }

    setAuth({
      ...auth,
      nsurAccount: {
        myPoints: 1 // should be data.points
      }
    })

    reset()
    setLoading(false)
    toast('Connected to NSUR - Completed', { type: 'success' })
  }

  if (loading) {
    return (
      <div className='w-full h-screen-80 flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
      <section className='text-center'>
        <h3 className='font-bold text-4xl'>Connect NSUR account</h3>
        <span className='text-lg font-semibold'>Enter you NSUR details</span>
      </section>

      <section className='mt-12'>
        <InputBasicForm
          id='email'
          isRequired
          name='email'
          type='email'
          label='EMAIL (SAME AS NSUR)'
          registerId='email'
          placeholder='Enter email'
          autoComplete='email'
          errors={errors.email}
          register={register}
          rulesForm={{
            required: { value: true, message: 'Email Required *' },
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'Enter a valid email *'
            }
          }}
        />

        <InputBasicForm
          id='username'
          isRequired
          name='username'
          type='text'
          label='NSUR USER NAME'
          registerId='username'
          placeholder='Enter username'
          autoComplete='username'
          errors={errors.username}
          register={register}
          rulesForm={{
            required: { value: true, message: 'Username Required *' },
            maxLength: { value: 50, message: 'Max 50 Characters *' },
            minLength: { value: 3, message: 'Min 3 Characters *' }
          }}
        />

        <CheckTermsAndConditions
          errors={errors.termsAndConditions}
          register={register}
          rulesForm={{ required: { value: true, message: 'Terms And Conditions Required *' } }}
        />

        <Button type='submit' classes='mt-6'>
        Connect to nsur
        </Button>
      </section>
    </form>
  )
}
