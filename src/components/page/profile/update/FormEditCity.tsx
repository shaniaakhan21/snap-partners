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

interface FormEditCityProps {
  auth: IAuth;
  setAuth: TSetAuth;
  typeUpdate: string;
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>;
}

interface IDataForm {
    newCity: string
  }

export const FormEditCity = ({
  auth,
  setAuth,
  typeUpdate,
  setTypeUpdate
}: FormEditCityProps) => {
  const { handleSubmit, register, reset, formState: { errors }, setError } = useForm<IDataForm>()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (dataForm: IDataForm) => {
    setIsLoading(true)

    try {
      await axios.post('/api/user/update-address', {
        city: dataForm.newCity
      }, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        }
      })

      setAuth({ ...auth, city: dataForm.newCity })

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

  return (<div className='max-w-2xl mx-auto rounded-2xl bg-white shadow-[0_1px_17px_-1px_rgba(0,0,0,0.2)] pt-4'>
    <section className='px-4 pt-3 '>
      <h3 className='text-xl font-bold'>Change City</h3>
    </section>

    <br />

    <form onSubmit={handleSubmit(onSubmit)}>
      <InputProfile
        disabled
        inputId='City'
        inputType='City'
        labelFor='City'
        labelName='Current City:'
        value={auth.city}
      />

      <InputProfile
        inputId='newCity'
        inputType='text'
        labelFor='newCity'
        labelName='New City:'
        placeholder='Insert the new City'
        register={register}
        rules={{
          required: { value: true, message: 'City is required *' },
          minLength: {
            value: 2,
            message: 'City must have at least 2 characters *'
          }
        }}
        error={errors.newCity}
      />
      <br />
      <div className='flex items-center bg-[#DCE5ED] rounded-b-2xl justify-end py-4 px-2 border-2 border-[#DCE5ED] '>
        <Button type='submit' classes='mr-4'>Save</Button>
        <Button classes='text-black bg-white' onClick={() => setTypeUpdate(null)}>
            Cancel
        </Button>
      </div>
    </form>
  </div>
  )
}
