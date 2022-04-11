import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { createArticle } from 'lib/services/marketing/createArticle'
import { IAuth } from 'lib/stores/Auth'
import { handleFetchError } from 'lib/utils/handleFetchError'

import { Spinner } from 'components/common/loaders'
import { Button } from 'components/common/Button'
import { InputBasicForm } from 'components/common/InputBasicForm'
import { TextArea } from 'components/common/TextArea'

const maxFileSizeInMb = 5

interface IDataFormCreateArticle {
  image: FileList
  title: string
  subtitle: string
  caption: string
  hashtags: string
}

interface IFormToCreateArticleProps {
  userAuth: IAuth
  typeMarketing: 'customer' | 'driver' | 'merchant' | 'ibo'
}

export const FormToCreateArticle = ({ userAuth, typeMarketing }: IFormToCreateArticleProps) => {
  const { handleSubmit, setError, register, reset, formState: { errors } } = useForm<IDataFormCreateArticle>()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (dataForm: IDataFormCreateArticle) => {
    setLoading(true)

    if (dataForm.image && dataForm.image[0].size > (maxFileSizeInMb * 1000000)) {
      setError('image', { message: `The maximum file size in article imagee is ${maxFileSizeInMb}mb, please upload a file with a maximum file size of ${maxFileSizeInMb}mb` })
      setLoading(false)
    }

    const dataToSend = {
      ...dataForm,
      type: typeMarketing,
      image: dataForm.image[0]
    }

    const { error } = await createArticle(dataToSend, userAuth.accessToken)

    if (error) {
      handleFetchError(error.status, error.info)
      return
    }

    reset()
    setLoading(false)
  }

  if (loading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl mx-auto mt-10'>
      <label htmlFor='idImage' className='font-bold text-gray-700 uppercase text-sm'>Upload Image <span className='text-red-500'>*</span></label>
      {errors.image && <p className='text-sm text-red-400'>{errors.image.message}</p>}
      <span className='block text-gray-800 text-sm'>Format JPG, JPEG, PNG, WEBP and PDF Max 5mb</span>
      <input
        id='image'
        name='image'
        type='file'
        accept='.jpg, .jpeg, .png, .webp, .pdf'
        {...register('image')}
        className='block w-full my-2 text-sm text-slate-500 cursor-pointer
        file:mr-4 file:py-2 file:px-2
        file:rounded-full file:border-0
        file:text-xs file:font-bold file:uppercase
        file:bg-gray-500 file:text-white
        file:w-1/2 hover:file:opacity-90
        file:hover:cursor-pointer'
      />

      <InputBasicForm
        id='title'
        name='title'
        type='text'
        label='Title'
        registerId='title'
        placeholder='Enter Title'
        errors={errors.title}
        register={register}
        // rulesForm={registerRulesConfig.name}
        isRequired
      />

      <InputBasicForm
        id='subtitle'
        name='subtitle'
        type='text'
        label='Subtitle'
        registerId='subtitle'
        placeholder='Enter Subtitle'
        errors={errors.title}
        register={register}
        // rulesForm={registerRulesConfig.name}
        isRequired
      />

      <TextArea
        id='caption'
        name='caption'
        label='Caption'
        registerId='caption'
        placeholder='Enter Caption'
        errors={errors.caption}
        register={register}
        // rulesForm={registerRulesConfig.name}
        isRequired
        rows={4}
      />

      <TextArea
        id='hashtags'
        name='hashtags'
        label='Hashtags'
        registerId='hashtags'
        placeholder='Enter Hashtags'
        errors={errors.hashtags}
        register={register}
        // rulesForm={registerRulesConfig.name}
        isRequired
        rows={2}
      />

      <Button classes='uppercase'>
        Publish Asset
      </Button>
    </form>
  )
}
