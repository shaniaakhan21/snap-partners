import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import FirstCol from './promotion/FirstCol'
import TopSection from './promotion/TopSection'
import BottomSection from './promotion/BottomSection'
import ImageModal from './promotion/ImageModal'
import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

const { SEO } = APP_INFO

const PromotionViewPage: Page = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const isMobile = useMediaQuery({ query: '(max-width: 630px)' })

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc)
    setModalOpen(true)
  }

  const closeModal = () => {
    setSelectedImage('')
    setModalOpen(false)
  }

  return (
    <><div className='w-full'>
      <p className='w-full text-lg text-center sm:text-left sm:text-3xl font-bold'>Sprint To Paradise Promotion Tracker</p> <br />
      <div className="w-full bg-white rounded-lg px-0 py-0 flex flex-row">
        <div className='w-full'>
          <div className='border-bot-box flex sm:flex-row flex-col'>
            <div className='w-full sm:w-1/6 green-red-light-bg'>
              <FirstCol
                image={isMobile ? '/static/promotion/green-star-one.svg' : '/static/promotion/star-one.svg'}
                text="1 Star"
              />
            </div>
            <div className='sm:w-6/12'>
              <TopSection/>
            </div>
            <div className='p-4 sm:py-10 sm:px-10'>
              <img src='/static/promotion/first-promo-rounded.svg'
                onClick={() => !isMobile && openModal('/static/promotion/big-1-image.svg')}
              />
            </div>
          </div>

          <div className='flex sm:flex-row flex-col'>
            <div className='sm:w-1/6 light-bg-color'>
              <FirstCol
                image="/static/promotion/star-three.png"
                text="Achieve More Stars!"
              />
            </div>
            <div className='w-full sm:w-6/12'>
              <BottomSection/>
            </div>
            <div className='p-4 sm:py-10 sm:px-10'>
              <img src='/static/promotion/second-promo-rounded.svg'
                onClick={() => !isMobile && openModal('/static/promotion/big-2-image.svg')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    {modalOpen && selectedImage && (
      <ImageModal src={selectedImage} onClose={closeModal} />
    )}
    </>
  )
}

PromotionViewPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Dashboard</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default PromotionViewPage
