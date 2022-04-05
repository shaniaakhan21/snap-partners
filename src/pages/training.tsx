import { Fragment, MouseEvent } from 'react'
import Head from 'next/head'

import { ITraining, TTrainingType } from 'lib/types/training'
import { useTrainingData } from 'lib/hooks/useTrainingData'
import { Page, ReactNode } from 'lib/types'
import { useAuthStore } from 'lib/stores'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { CategoryChip } from 'components/page/training/CategoryChip'
import { ListCategoryChip } from 'components/page/training/TrainingCategoryList'
import { TrainingVideo } from 'components/page/training/TrainingVideoElement'
import { TrainingVideoList } from 'components/page/training/TrainingVideoList'
import { EmptyData } from 'components/common/EmptyData'
import { Spinner } from 'components/common/loaders'

const { SEO } = APP_INFO

const TrainingPage: Page = () => {
  const { auth } = useAuthStore()
  const { data, isLoading, category, setCategory } = useTrainingData(auth.accessToken)

  const handleChangeCategory = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.target as HTMLButtonElement
    setCategory(id as TTrainingType)
  }

  return (
    <>
      <ListCategoryChip>
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
      </ListCategoryChip>

      <br />
      <br />

      {isLoading && (
        <div className='w-full h-full flex items-center justify-center'>
          <Spinner />
        </div>
      )}

      {!isLoading && data[category] && data[category].length === 0 && (
        <EmptyData label='Training videos not found.' />
      )}

      {!isLoading && data[category] && data[category].length > 0 && (
        <TrainingVideoList>
          {data[category].map((video: ITraining, i: number) => (
            <Fragment key={i}>
              <TrainingVideo
                title={video.title}
                subtitle={video.subtitle}
                caption={video.caption}
                url={video.url}
              />
            </Fragment>
          ))}
        </TrainingVideoList>
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
