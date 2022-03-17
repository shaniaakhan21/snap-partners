import { MouseEvent } from 'react'
// import { useForm } from 'react-hook-form'

import { useCopyToClipboard } from 'lib/hooks/useCopyToClipboard'
import { IUserData } from 'lib/types/user'

import { CopyIcon, EmailIcon, PhoneIcon } from 'components/common/icons'
// import { TRANK } from 'lib/types/user/ranks'

interface IProps extends IUserData {
  onClick?: (e: MouseEvent, element: HTMLElement) => void
  referralUsers: any[]
  sponsor?: string
  rank?: string
  authIsAdmin: boolean
}

export const ReferralsUserDetailModal = ({ id, name, email, phone, sponsor, rank, onClick, authIsAdmin }: IProps) => {
  // const { handleSubmit, register } = useForm<{ rankToUpdate: TRANK }>()
  const { copy } = useCopyToClipboard()
  // const buttonCancelRef = useRef()

  // const onSubmit = ({ rankToUpdate }: { rankToUpdate: TRANK }) => {
  //   console.log('UserDetailModal - rankToUpdate => /api/rank/update', {
  //     userId: id,
  //     rank: rankToUpdate
  //   })
  // }

  return (
    <div className='p-1 text-xs sm:text-sm lg:text-base'>
      {/* <div className={[classes.buttonCancelContainer, classes.separation, classes.flexEnd].join(' ')}>
        <button
          className={classes.buttonCancel}
          ref={buttonCancelRef}
          onClick={(e) => onClick(e, [buttonCancelRef.current])}
        >
          <CancelIcon width='24' height='24' />
        </button>
      </div> */}

      <div className='mb-4 flex items-center justify-end'>
        {/* {
          authIsAdmin && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <label
                className='font-bold'
                htmlFor='civilState'
              >
                Rank
              </label>

              <select
                id='rankToUpdate'
                name='rankToUpdate'
                className='relative w-full px-3 py-1.5 my-2 bg-[rgba(255,255,255,.13)] rounded-md border border-solid border-black outline-none appearance-none leading-8'
                defaultValue='referralPartner'
                placeholder='User Rank'
                {...register('rankToUpdate')}
              >
                <option className='text-black' value='referralPartner'>Referral Partner</option>
                <option className='text-black' value='manager'>Manager</option>
                <option className='text-black' value='supervisor'>Supervisor</option>
                <option className='text-black' value='director'>Director</option>
                <option className='text-black' value='executive'>Executive</option>
              </select>
            </form>
          )
        } */}

        <div className='flex items-center justify-end'>
          <span className='text-primary-500 font-bold'>USER ID</span>

          <button onClick={() => copy(id, 'ID')} className='ml-3 text-blue-600 flex items-center transition-colors hover:text-blue-600 lg:text-textHint'>
            <span className='mr-3'>{id}</span>
            <CopyIcon classes="w-5 h-5" />
          </button>
        </div>
      </div>

      <hr className='my-4 bordet-t border-gray-300' />

      <div className='flex justify-between items-start'>
        <p className='mb-4 block text-primary-500 font-bold'>{name.toUpperCase()}</p>
        <p className='mb-4 block text-gray-800 font-bold'>{rank === 'referralPartner' ? 'Referral Partner' : rank}</p>
      </div>

      <div className='mb-8 flex flex-col sm:flex-row justify-center sm:items-center sm:justify-between'>
        <div className='inline-flex items-center'>
          <EmailIcon classes='w-5 h-5' />
          <span className='ml-1 text-blue-600'>{email}</span>
        </div>

        <div className='inline-flex items-center'>
          <PhoneIcon classes='w-5 h-5' />
          <span className='ml-1 text-blue-600'>{phone}</span>
        </div>
      </div>

      {
        sponsor && (
          <p className='inline-block'>
            Sponsored by {' '}
            <span className='inline-block text-primary-500'>{sponsor}</span>
          </p>
        )
      }
    </div>
  )
}
