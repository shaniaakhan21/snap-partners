import { CalendarIcon, CopyIcon } from 'components/common/icons'
import { useCopyToClipboard } from 'lib/hooks/useCopyToClipboard'
import { GTMTrack } from 'lib/utils/gtm'
import { useMemo } from 'react'

interface IProps {
  title: string
  ilustration: any
  link: string
  newUser?: boolean
  classes?: string
}

export const ReferralCards = ({ title, ilustration, link, newUser = false, classes = '' }: IProps) => {
  const { copy } = useCopyToClipboard()

  const userType: string = useMemo(() => {
    if (link.includes('vidgo')) {
      return 'VIDGO'
    }

    // find card userType
    const idx = link.indexOf('role=')
    return link.substring(idx + 5)
  }, [link])

  const onClick = () => {
    GTMTrack.referralCard(userType, `copy for ${userType}`, '')
    copy(link, 'Referral link')
  }

  return (
    <div className={`w-full p-1 sm:p-6 bg-white flex flex-row items-center justify-center rounded-sm shadow ${classes}`}>
      {/* Es necesario refactorizar el newUser en un nuevo componente  */}
      {newUser
        ? (
          <div className='w-full flex items-center justify-between'>
            <div className='flex items-center justify-center'>
              <div className='h-4 w-4 rounded-sm bg-primary-500 mr-2 last:mr-0' />
              <div className='h-4 w-4 rounded-sm bg-primary-500 mr-2 last:mr-0' />
            </div>

            <div className='inline-flex items-center'>
              {/* <span className='text-textAcent-500 font-bold text-xs mr-2'>NEW USER!</span> */}
              <span className='text-textHint font-bold text-xs mr-2'>17.08.20</span>
              <CalendarIcon classes='w-4 h-4' />
            </div>
          </div>
        )
        : (
          <div className='h-4' />
        )}
      {/* el div con height imita la altura del anterior componente, si se modifica dicha altura, también se debe modificar el valor */}
      <div className='w-1/3'>
        {ilustration}
      </div>
      <div className='flex flex-col w-3/4 ml-4'>
        <h3 className={`w-full text-base font-semibold text-start ${newUser ? 'my-4' : 'mb-4'}`}>{title}</h3>

        {/* <hr className='w-full my-4 mx-auto border-t border-gray-300' /> */}

        <button
          onClick={onClick}
          className='lg:text-black inline-flex items-center transition-colors hover:text-black w-[90%]  border rounded bg-primary-500'
        >
          <span className='text-xs sm:text-sm text-black bg-white w-[80%] py-2'>Copy Referral Link</span>
          <div className='w-[20%] flex align-center justify-center'>
            <CopyIcon />
          </div>
        </button>

      </div>
    </div>
  )
}
