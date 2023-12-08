/* eslint-disable array-callback-return */
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
import { useMediaQuery } from 'react-responsive'
import { Spinner } from 'components/common/loaders'
import { AllAchieverTable } from './promotion/StarAchieverTable'

const { SEO } = APP_INFO

const PromotionViewPage: Page = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [sprintData, setSprintData] = useState({})
  const [tableRows, setTableRows] = useState([])
  const isMobile = useMediaQuery({ query: '(max-width: 630px)' })

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
    const getTeamProgressData = async () => {
      const token = getLocalStorage('accessToken')
      await axios.get('/api/sprint-to-paradise/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((result) => {
          const arr = result.data.users.filter((user) => user.boxes !== null)
          const allAchieverData = []
          arr.map((element) => {
            const boxes = JSON.parse(element.boxes)
            allAchieverData.push({
              id: element.id,
              name: element.name,
              count: Object.values(boxes).filter(value => value === true).length,
              date: element.date,
              userId: element.userId,
              ...boxes

            })
          })
          allAchieverData.sort((a, b) => b.count - a.count)
          setTableRows(allAchieverData)
        })
    }
    getSprintData()
  }, [])

  console.log('sprint Data is', sprintData)

  return (
    <><div className='w-full'>
      <p className='w-full text-lg text-center sm:text-left sm:text-3xl font-bold'>Sprint To Paradise Promotion Tracker</p> <br />
      { Object.keys(sprintData).length > 0
        ? <div className="w-full bg-white rounded-lg px-0 py-0 flex flex-row">
          <div className='w-full'>
            <div className='border-bot-box flex sm:flex-row flex-col'>
              <div className='w-full sm:w-1/6 green-red-light-bg'>
                <FirstCol
                  image={isMobile ? '/static/promotion/green-star-one.svg' : '/static/promotion/star-one.svg'}
                  text="1 Star"
                />
              </div>
              <div className='sm:w-6/12'>
                <TopSection sprintData={sprintData} />
              </div>
              <div className='p-1 sm:py-10 sm:px-10'>
                <img src={isMobile ? '/static/promotion/big-1-image.svg' : '/static/promotion/first-promo-rounded.svg'}
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
                <BottomSection sprintData={sprintData}/>
              </div>
              <div className='p-1 sm:py-10 sm:px-10'>
                <img src={isMobile ? '/static/promotion/big-2-image.svg' : '/static/promotion/second-promo-rounded.svg'}
                  onClick={() => !isMobile && openModal('/static/promotion/big-2-image.svg')}
                />
              </div>
            </div>
            <div className='mt-10'>
              <p className='w-full text-md text-center sm:text-left sm:text-xl  font-bold'>My Team's Progress to 1-Star</p>
              <AllAchieverTable allAchieverArray={tableRows} refreshFunc={() => {}} isPersonal= {true} />
            </div>
          </div>
        </div>
        : <div className='flex items-center justify-center h-screen'><Spinner /></div>}
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
