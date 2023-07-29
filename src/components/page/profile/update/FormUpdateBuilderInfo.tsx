import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useCallback, useState } from 'react'

import { sendEmailToConfirm } from 'lib/services/user/updateUserEmail'
import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { BuilderWebsiteField, builderWebsiteFields, TAccountInfoToUpdate } from 'lib/types/user/profile'
import { IAuth, TSetAuth } from 'lib/stores/Auth'
import { GTMTrack } from 'lib/utils/gtm'

import { SpinnerPageContent } from 'components/common/loaders/PageContent'
import { InputProfile } from '../commons/InputProfile'
import { Button } from 'components/common/Button'

interface IFormUpdatePhoneProps {
  auth: IAuth
  setAuth: TSetAuth
  typeUpdate: string
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

type IDataForm = {
  [key in BuilderWebsiteField]: string
}

export const FormUpdateBuilderInfo = ({ auth, setAuth, typeUpdate, setTypeUpdate }: IFormUpdatePhoneProps) => {
  const [state, setState] = useState(builderWebsiteFields.reduce((acc, field) => ({ ...acc, [field]: auth[field] }), {}))

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    setIsLoading(true)

    await fetch('/api/user/update-builder-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.accessToken}`
      },
      body: JSON.stringify(state)
    })

    setAuth({ ...auth, ...state })

    GTMTrack.editProfile(typeUpdate)
    setTypeUpdate(null)
    setIsLoading(false)
  }, [auth, state, typeUpdate])

  if (isLoading) {
    return <SpinnerPageContent/>
  }

  return (
    <div className='max-w-3xl mx-auto'>
      <section>
        <h3 className='text-xl font-bold'>Update Builder Website Info</h3>
      </section>

      <br/>

      <form onSubmit={() => onSubmit()}>
        {builderWebsiteFields.map((field) => (<InputProfile
          inputId={field}
          inputType='text'
          labelFor={field}
          labelName={`${(field.charAt(0).toUpperCase() + field.slice(1)).replace('_url', ' URL')}`}
          placeholder={`Enter ${(field.charAt(0).toUpperCase() + field.slice(1)).replace('_url', ' URL')}`}
          defaultValue={auth[field] ?? ''}
          onChange={(e) => setState({ ...state, [field]: e.target.value })}
        />))}
        <br/>
        <div className='flex items-center'>
          <Button type='submit' classes='mr-2'>Save</Button>
          <Button onClick={() => setTypeUpdate(null)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
