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

interface FormEditDateOfBirthProps {
  auth: IAuth;
  setAuth: TSetAuth;
  typeUpdate: string;
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>;
}

interface IDataForm {
    newDateOfBirth: Date
  }

export const FormEditDateOfBirth = ({
  auth,
  setAuth,
  typeUpdate,
  setTypeUpdate
}: FormEditDateOfBirthProps) => {
  const { handleSubmit, register, reset, formState: { errors }, setError } = useForm<IDataForm>()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (dataForm: IDataForm) => {
    setIsLoading(true)

    try {
      const newDateOfBirth = dataForm.newDateOfBirth
      await axios.post('/api/user/update-dob', {
        dateOfBirth: newDateOfBirth
      }, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        }
      }
      )

      setAuth({ ...auth, dateOfBirth: newDateOfBirth })

      GTMTrack.editProfile(typeUpdate)
      reset()
      setTypeUpdate(null)
      setIsLoading(false)
    } catch (error) {
      toast('please try another one', { type: 'error' })
    }
    setIsLoading(false)
  }

  if (isLoading) {
    return <SpinnerPageContent />
  }

  return (
    <div className='max-w-3xl mx-auto'>
      <section>
        <h3 className='text-xl font-bold'>Change Date of Birth</h3>
      </section>

      <br />

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputProfile
          disabled
          inputId='dateOfBirth'
          inputType='text'
          labelFor='dateOfBirth'
          labelName='Current Date Of Birth'
          value={
            auth.dateOfBirth
              ? new Date(auth.dateOfBirth).toLocaleDateString()
              : ''
          }
        />

        <InputProfile
          inputId='newDateOfBirth'
          inputType='date'
          labelFor='newDateOfBirth'
          labelName='New Date of Birth'
          placeholder='Insert the new Date of Birth'
          register={register}
          rules={{ required: { value: true, message: 'Date of Birth is required *' } }}
          error={errors.newDateOfBirth}
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