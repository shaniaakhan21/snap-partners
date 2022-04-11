import { GenealogyIcon } from 'components/common/icons'

interface IPhotoAccountProps {
  photoURL: string
}

export const PhotoAccount = ({ photoURL }: IPhotoAccountProps) => {
  return (
    <div className='w-20 h-20 bg-gray-500 rounded-full flex justify-center items-center relative'>
      {
        photoURL
          ? <img src={photoURL} className='w-20 h-20 rounded-full' />
          : <GenealogyIcon classes='w-20 h-20' />
      }

      {/*
        <button className='absolute top-0 right-0 px-1 py-1 bg-white rounded-full flex justify-center items-center border border-red'>
          <EditIcon classes='w-5 h-5' />
        </button>
      */}
    </div>
  )
}
