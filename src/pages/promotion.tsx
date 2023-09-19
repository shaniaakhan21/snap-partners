import Head from 'next/head'
import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import FirstCol from './promotion/FirstCol'
import TopSection from './promotion/TopSection'
import BottomSection from './promotion/BottomSection'
import ImageModal from './promotion/ImageModal'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getLocalStorage } from 'lib/utils/localStorage'

const { SEO } = APP_INFO

const PromotionViewPage: Page = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [sprintData, setSprintData] = useState({})

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc)
    setModalOpen(true)
  }

  const closeModal = () => {
    setSelectedImage('')
    setModalOpen(false)
  }

  useEffect(() => {
    const getSprintData = async () => {
      const token = getLocalStorage('accessToken')
      await axios.get('/api/sprint-to-paradise', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((result) => {
        setSprintData(result.data)
      })
    }
    getSprintData()
  }, [])

  console.log('sprint Data is', sprintData)

  return (
    <><div className='w-[75%] sm:w-full'>
      <p className='w-full text-lg text-center lg:text-left lg:text-3xl font-bold'>Sprint To Paradise Promotion Tracker</p> <br />
      <div className="w-full bg-white rounded-lg px-0 py-0 flex flex-row">
        <div className='w-full'>
          <div className='border-bot-box flex lg:flex-row flex-col'>
            <div className='w-full lg:w-1/6 light-bg-color'>
              <FirstCol
                image="/static/promotion/star-one.svg"
                text="1 Star"
              />
            </div>
            <div className='lg:w-6/12'>
              <TopSection sprintData={sprintData} />
            </div>
            <div className='p-4 lg:py-10 lg:px-10'>
              <img src='/static/promotion/first-promo-rounded.svg'
                onClick={() => openModal('/static/promotion/big-1-image.svg')}
              />
            </div>
          </div>

          <div className='flex lg:flex-row flex-col'>
            <div className='lg:w-1/6 light-bg-color'>
              <FirstCol
                image="/static/promotion/star-three.png"
                text="Achieve More Stars!"
              />
            </div>
            <div className='w-full lg:w-6/12'>
              <BottomSection/>
            </div>
            <div className='p-4 lg:py-10 lg:px-10'>
              <img src='/static/promotion/second-promo-rounded.svg'
                onClick={() => openModal('/static/promotion/big-2-image.svg')}
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
