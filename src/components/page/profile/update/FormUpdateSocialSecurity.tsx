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

export const FormUpdateSocialSecurity = ({ auth, setTypeUpdate }: IFormUpdatePhoneProps) => {
  const router = useRouter()

  return (
    <div className='max-w-2xl mx-auto rounded-2xl bg-white md:shadow-[0_1px_17px_-1px_rgba(0,0,0,0.2)] pt-4'>
      <section className='px-4 pt-3 '>
        <h3 className='text-base md:text-xl font-bold'>Change Social Security Number</h3>
      </section>

      <br />

      <form >
        <InputProfile
          disabled
          inputId='socialSecurityNumber'
          inputType='text'
          labelFor='socialSecurityNumber'
          labelName='Current SSN:'
          value={auth.socialSecurityNumber}
        />
        <div className='relative rounded-xl bg-red-200 w-[95%] mx-4 px-4 py-3 border-y-2 border-y-gray-200 flex flex-col justify-between mt-2'>
          <p className='text-sm md:text-lg font-bold'>Please open a help ticket to update your social security number. </p>
        </div>

        <br />
        <div className='flex items-center bg-[#DCE5ED] rounded-b-2xl justify-end py-4 px-2 border-2 border-[#DCE5ED] '>
          <Button type='submit' classes='mr-2' onClick={() => setTypeUpdate(null)}>Go BACK</Button>
        </div>
      </form>
    </div>
  )
}
