import { CalendarIcon, CopyIcon } from 'components/common/icons'
import { useCopyToClipboard } from 'lib/hooks/useCopyToClipboard'
import { GTMTrack } from 'lib/utils/gtm'
import SignedCert from 'pages/wellness/components/SignedCert'
import { useMemo, useState } from 'react'

interface IProps {
  title: string
  ilustration: any
  link: string
  newUser?: boolean
  classes?: string
  isCertified?: boolean
}

export const InactiveCards = ({ title, ilustration, link, newUser = false, classes = '', isCertified }: IProps) => {
  const [signedCertModalOpen, setSignedCertModalOpen] = useState(false)
  const openSignedCertModal = () => {
    setSignedCertModalOpen(true)
  }
  return (
    <div className={`w-full p-6 bg-white flex flex-col items-center justify-center rounded-sm shadow ${classes}`}>

      {/* <div className='w-full flex items-center justify-between'>
        <div className='flex items-center justify-center'>
          <div className='h-4 w-4 rounded-sm bg-primary-500 mr-2 last:mr-0' />
          <div className='h-4 w-4 rounded-sm bg-primary-500 mr-2 last:mr-0' />
        </div>

        <div className='inline-flex items-center'>
          <span className='text-textHint font-bold text-xs mr-2'>17.08.20</span>
          <CalendarIcon classes='w-4 h-4' />
        </div>
      </div> */}
      <div className='h-4' />

      <h3 className={`w-full text-lg font-semibold ${newUser ? 'my-4' : 'mb-4'}`}>{title}</h3>

      {ilustration}

      <hr className='w-full my-4 mx-auto border-t border-gray-300' />

      <button
        className='lg:text-black inline-flex items-center justify-center transition-colors hover:text-gray-600'
        onClick={openSignedCertModal}>
        <span className='text-sm mr-2 text-gray-600 underline'>Accept WeightCare Certificate to get link</span>
      </button>
      <SignedCert open={signedCertModalOpen} onClose={() => setSignedCertModalOpen(false)} />
    </div>
  )
}
