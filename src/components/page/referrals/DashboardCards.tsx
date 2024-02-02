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
  isCertified?: boolean
}

export const DashReferralCards = ({ title, ilustration, link, newUser = false, classes = '', isCertified }: IProps) => {
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
    <div className='bg-white w-full rounded-3xl shadow-[0_1px_12px_-1px_rgba(0,0,0,0.2)] mb-1'>
      <div className={`w-full pl-2 p-1 flex flex-row items-center justify-center ${classes}`}>
        {newUser
          ? (
            <div className='w-full flex items-center justify-between'>
              <div className='flex items-center justify-center'>
                <div className='h-4 w-4 rounded-sm bg-primary-500 mr-2 last:mr-0' />
                <div className='h-4 w-4 rounded-sm bg-primary-500 mr-2 last:mr-0' />
              </div>

              <div className='inline-flex items-center'>
                <span className='text-textHint font-bold text-xs mr-2'>17.08.20</span>
                <CalendarIcon classes='w-4 h-4' />
              </div>
            </div>
          )
          : (
            <div className='h-4' />
          )}
        <div className='w-1/4 h-fit '>
          {ilustration}
        </div>
        <div className='flex flex-col w-3/4 ml-0'>
          <h3 className={`w-full text-lg font-semibold text-start ml-4 ${newUser ? 'my-4' : 'mb-0'}`}>{title}</h3>
        </div>
      </div>
      <div>
        <button
          onClick={onClick}
          className='p-4 lg:text-black inline-flex items-center transition-colors hover:text-black w-full bg-[#F0F4F8] rounded-b-3xl'
        >
          <div className='flex flex-row w-full rounded-md '>
            <span className='rounded-l-md border-l-2 border-t-2 border-b-2 border-[#E1E8EB] text-xs sm:text-sm text-black bg-white w-[80%] py-2 text-start px-4 font-semibold'>Copy Referral Link</span>
            <div className='rounded-r-md w-[20%] flex align-center justify-center bg-[#E74426] p-2'>
              <CopyIcon />
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
