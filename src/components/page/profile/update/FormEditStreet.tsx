import { useForm } from 'react-hook-form'
import { Dispatch, SetStateAction, useState } from 'react'
import { IAuth, TSetAuth } from 'lib/stores/Auth'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import axios from 'axios'
import { GTMTrack } from 'lib/utils/gtm'
import { toast } from 'react-toastify'
import { SpinnerPageContent } from 'components/common/loaders/PageContent'
import { InputProfile } from '../commons/InputProfile'
import { Button } from 'components/common/Button'

interface FormEditStreetProps {
  auth: IAuth;
  setAuth: TSetAuth;
  typeUpdate: string;
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>;
}

interface IDataForm {
    newStreet: string
  }

export const FormEditStreet = ({
  auth,
  setAuth,
  typeUpdate,
  setTypeUpdate
}: FormEditStreetProps) => {
  const { handleSubmit, register, reset, formState: { errors }, setError } = useForm<IDataForm>()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (dataForm: IDataForm) => {
    setIsLoading(true)

    try {
      await axios.post('/api/user/update-address', {
        street: dataForm.newStreet
      }, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        }
      })

      setAuth({ ...auth, street: dataForm.newStreet })

      GTMTrack.editProfile(typeUpdate)
      reset()
      setTypeUpdate(null)
      setIsLoading(false)
    } catch (error) {
      toast('Please try another one', { type: 'error' })
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <SpinnerPageContent />
  }

  return (<div className='max-w-3xl mx-auto'>
    <section>
      <h3 className='text-xl font-bold'>Change Username</h3>
    </section>

    <br />

    <form onSubmit={handleSubmit(onSubmit)}>
      <InputProfile
        disabled
        inputId='Street'
        inputType='Street'
        labelFor='Street'
        labelName='Current Street'
        value={auth.street}
      />

      <InputProfile
        inputId='newStreet'
        inputType='text'
        labelFor='newStreet'
        labelName='New Street'
        placeholder='Insert the new Street'
        register={register}
        rules={{
          required: { value: true, message: 'Street is required *' },
          minLength: {
            value: 2,
            message: 'Street must have at least 2 characters *'
          }
        }}
        error={errors.newStreet}
      />
      <br />
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