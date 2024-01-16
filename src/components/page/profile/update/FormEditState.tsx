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
import states from 'data/states'

interface FormEditStateProps {
  auth: IAuth;
  setAuth: TSetAuth;
  typeUpdate: string;
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>;
}

interface IDataForm {
    newState: string
  }

export const FormEditState = ({
  auth,
  setAuth,
  typeUpdate,
  setTypeUpdate
}: FormEditStateProps) => {
  const { handleSubmit, register, reset, formState: { errors }, setError } = useForm<IDataForm>()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (dataForm: IDataForm) => {
    setIsLoading(true)

    try {
      await axios.post('/api/user/update-address', {
        state: dataForm.newState
      }, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        }
      })

      setAuth({ ...auth, state: dataForm.newState })

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
      <h3 className='text-xl font-bold'>Change State</h3>
    </section>

    <br />

    <form onSubmit={handleSubmit(onSubmit)}>
      <InputProfile
        disabled
        inputId='State'
        inputType='State'
        labelFor='State'
        labelName='Current State'
        value={auth.state}
      />
      <select
        className='relative rounded-xl bg-white w-full px-4 py-3 border-y-2 border-y-gray-200 flex flex-col justify-between'
        id='newState'
        name='newState'
        style={{ backgroundImage: 'none' }}
        {...register('newState', { required: 'State is required *' })}
      >
        <option value=''>Select a state</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
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
