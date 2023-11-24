import { CalendarIcon, CopyIcon } from 'components/common/icons'
import { useCopyToClipboard } from 'lib/hooks/useCopyToClipboard'
import { GTMTrack } from 'lib/utils/gtm'
import ContractModal from 'pages/wellness/components/ContractModal'
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
    <div className={`w-full p-1 sm:p-6 bg-white flex flex-row items-center justify-center rounded-sm shadow ${classes}`}>
      <div className='h-4' />
      <div className='w-1/3'>
        {ilustration}
      </div>
      <div className='flex flex-col w-3/4 ml-4'>
        <h3 className={`w-full text-base font-semibold ${newUser ? 'my-2' : 'mb-2'}`}>{title}</h3>
        <hr className='w-full my-2 mx-auto border-t border-gray-300' />

        <button
          className='lg:text-black inline-flex items-center justify-center transition-colors hover:text-gray-600'
          onClick={openSignedCertModal}>
          <span className='text-sm mr-2 text-gray-600 underline'>Accept WeightCare Certificate to get link</span>
        </button>
      </div>
      <ContractModal open={signedCertModalOpen} onClose={() => setSignedCertModalOpen(false)} />
    </div>
  )
}
