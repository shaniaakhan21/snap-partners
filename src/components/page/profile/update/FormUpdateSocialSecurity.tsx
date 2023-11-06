import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

import { sendEmailToConfirm } from 'lib/services/user/updateUserEmail'
import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { IAuth, TSetAuth } from 'lib/stores/Auth'
import { GTMTrack } from 'lib/utils/gtm'

import { SpinnerPageContent } from 'components/common/loaders/PageContent'
import { InputProfile } from '../commons/InputProfile'
import { Button } from 'components/common/Button'
import { useRouter } from 'next/router'

interface IFormUpdatePhoneProps {
  auth: IAuth
  setAuth: TSetAuth
  typeUpdate: string
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

export const FormUpdateSocialSecurity = ({ auth }: IFormUpdatePhoneProps) => {
  const router = useRouter()

  return (
    <div className='max-w-3xl mx-auto'>
      <section>
        <h3 className='text-xl font-bold'>Change Social Security Number</h3>
      </section>

      <br />

      <form >
        <InputProfile
          disabled
          inputId='socialSecurityNumber'
          inputType='text'
          labelFor='socialSecurityNumber'
          labelName='Current Social Security Number'
          value={auth.socialSecurityNumber}
        />
        <div className='relative rounded-xl bg-red-200 w-full px-4 py-3 border-y-2 border-y-gray-200 flex flex-col justify-between mt-2'>
          <p className='text-lg font-bold'>Please raise health ticket to update your Social Security Number. </p>
        </div>

        <br />
        <div className='flex items-center'>
          <Button type='submit' classes='mr-2' onClick={() => router.push('/profile')}>Go BACK</Button>
        </div>
      </form>
    </div>
  )
}
