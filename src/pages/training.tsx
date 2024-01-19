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
import { EmptyData } from 'components/common/empty/EmptyData'
import { useNearScreen } from 'lib/hooks/useNearScreen'
import { Spinner } from 'components/common/loaders'
import { removeSpaces } from 'lib/utils/removeSpaces'

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
        {(auth.roles.customer || auth.roles.driver || auth.roles.merchant) && (
          <CategoryChip
            id='all'
            categorySelected={category}
            onClick={handleChangeCategory}
            className='md:rounded-l-3xl'
          >
          All
          </CategoryChip>
        )}
        {(auth.roles.customer || auth.roles.driver || auth.roles.merchant) && (
          <CategoryChip
            id='start'
            categorySelected={category}
            onClick={handleChangeCategory}
          >
          Getting Started
          </CategoryChip>
        )}
        {(auth.roles.customer || auth.roles.driver || auth.roles.merchant) && (
          <CategoryChip
            id='customer'
            categorySelected={category}
            onClick={handleChangeCategory}
          >
          Customer Acquisition
          </CategoryChip>
        )}
        {(auth.roles.customer || auth.roles.driver || auth.roles.merchant) && (
          <CategoryChip
            id='driver'
            categorySelected={category}
            onClick={handleChangeCategory}
          >
          Driver Acquisition
          </CategoryChip>
        )}
        {(auth.roles.customer || auth.roles.driver || auth.roles.merchant) && (
          <CategoryChip
            id='merchant'
            categorySelected={category}
            onClick={handleChangeCategory}
          >
          Open A Market
          </CategoryChip>
        )}
        {(auth.roles.customer || auth.roles.driver || auth.roles.merchant) && (
          <CategoryChip
            id='empire'
            categorySelected={category}
            onClick={handleChangeCategory}
          >
          Build An Empire
          </CategoryChip>
        )}
        <CategoryChip
          id='agent'
          categorySelected={category}
          onClick={handleChangeCategory}
          className='md:rounded-r-3xl'
        >
          Agent Training
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
                  id={`training-iframe-video-${removeSpaces(category)}-${removeSpaces(video.title)}-${i}`}
                  category={category}
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
