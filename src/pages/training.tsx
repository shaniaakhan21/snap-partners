import { Fragment, MouseEvent } from 'react'
import Head from 'next/head'

import { ITraining, TTrainingType } from 'lib/types/training'
import { useTrainingData } from 'lib/hooks/useTrainingData'
import { Page, ReactNode } from 'lib/types'
import { useAuthStore } from 'lib/stores'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { CategoryChip } from 'components/page/training/CategoryChip'
import { CategoryChipList } from 'components/page/training/CategoryChipList'
import { Video } from 'components/page/training/Video'
import { VideoList } from 'components/page/training/VideoList'
import { EmptyData } from 'components/common/EmptyData'
import { useNearScreen } from 'lib/hooks/useNearScreen'
import { Spinner } from 'components/common/loaders'

const { SEO } = APP_INFO

const VISOR_ELEMENT_ID = 'visor-training'

const TrainingPage: Page = () => {
  const { auth } = useAuthStore()
  const {
    trainings,
    isFetchLoading,
    isNearScreenLoading,
    category,
    setCategory,
    increasePage
  } = useTrainingData(auth.accessToken)

  useNearScreen(VISOR_ELEMENT_ID, () => {
    increasePage()
  })

  const handleChangeCategory = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.target as HTMLButtonElement
    setCategory(id as TTrainingType)
  }

  return (
    <>
      <CategoryChipList>
        <CategoryChip
          id='all'
          categorySelected={category}
          onClick={handleChangeCategory}
        >
          All
        </CategoryChip>
        <CategoryChip
          id='start'
          categorySelected={category}
          onClick={handleChangeCategory}
        >
          Getting Started
        </CategoryChip>
        <CategoryChip
          id='customer'
          categorySelected={category}
          onClick={handleChangeCategory}
        >
          Customer Acquisition
        </CategoryChip>
        <CategoryChip
          id='driver'
          categorySelected={category}
          onClick={handleChangeCategory}
        >
          Driver Acquisition
        </CategoryChip>
        <CategoryChip
          id='merchant'
          categorySelected={category}
          onClick={handleChangeCategory}
        >
          Open A Market
        </CategoryChip>
        <CategoryChip
          id='empire'
          categorySelected={category}
          onClick={handleChangeCategory}
        >
          Build An Empire
        </CategoryChip>
      </CategoryChipList>

      <br />
      <br />

      {isFetchLoading && (
        <div className='w-full h-full flex items-center justify-center'>
          <Spinner />
        </div>
      )}

      {!isFetchLoading && trainings[category] && trainings[category].length === 0 && (
        <EmptyData label='Training videos not found.' />
      )}

      {!isFetchLoading && trainings[category] && trainings[category].length > 0 && (
        <>
          <VideoList>
            {trainings[category].map((video: ITraining, i: number) => (
              <Fragment key={i}>
                <Video
                  title={video.title}
                  subtitle={video.subtitle}
                  caption={video.caption}
                  url={video.url}
                />
              </Fragment>
            ))}
          </VideoList>
          {isNearScreenLoading && (
            <div className='flex items-center justify-center py-8'>
              <Spinner />
            </div>
          )}
          {!isFetchLoading && !isNearScreenLoading && <div id={VISOR_ELEMENT_ID} />}
        </>
      )}
    </>
  )
}

TrainingPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Training</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default TrainingPage
