import ContractModal from 'pages/wellness/components/ContractModal'
import { useState } from 'react'

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
    <div className='bg-white w-full rounded-3xl shadow-lg mb-8'>
      <div className={`w-full p-1 bg-white flex flex-row rounded-t-3xl items-center justify-center ${classes}`}>
        <div className='h-4' />
        <div className='w-1/4 h-[71px] sm:h-full'>
          {ilustration}
        </div>
        <div className='flex flex-col w-3/4'>
          <h3 className={`w-full text-lg sm:text-2xl font-semibold text-start ${newUser ? 'my-2' : 'mb-2'}`}>{title}</h3>
        </div>
        <ContractModal open={signedCertModalOpen} onClose={() => setSignedCertModalOpen(false)} />
      </div>
      <div>
        <button
          className='p-6 lg:p-10 lg:text-black rounded-b-3xl bg-[#F0F4F8] w-full inline-flex items-center justify-center transition-colors hover:text-gray-600'
          onClick={openSignedCertModal}>
          <span className='text-sm mr-2 text-gray-600 underline'>Accept WeightCare Certificate to get link</span>
        </button>
      </div>
    </div>
  )
}
