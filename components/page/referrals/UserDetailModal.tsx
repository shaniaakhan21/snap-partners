import { CopyIcon, EmailIcon, PhoneIcon } from 'components/common/icons'
import { IUserData } from 'lib/types/user'
import { MouseEvent } from 'react'

interface IProps extends IUserData {
  onClick?: (e: MouseEvent<HTMLButtonElement>, elements: []) => void
}

export const ReferralsUserDetailModal = ({ id, name, email, phone, onClick }: IProps) => {
  // const buttonCancelRef = useRef()

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

      <div className='mb-4 flex items-center justify-between'>
        <span className='text-primary-500 font-bold'>USER ID</span>
        <button className='text-blue-600 flex items-center transition-colors hover:text-blue-600 lg:text-textHint'>
          <span className='mr-1'>{id}</span>
          <CopyIcon classes="w-5 h-5" />
        </button>
      </div>

      <hr className='my-4 bordet-t border-gray-300' />

      <span className='mb-4 block text-primary-500 font-bold'>{name.toUpperCase()}</span>

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

      <span className='inline-block'>Sponsored by <span className='inline-block text-primary-500'>Génesis Quintero</span></span>
    </div>
  )
}
