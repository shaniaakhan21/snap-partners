import Head from 'next/head'
import { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { TrainingCategoryList } from 'components/page/training/TrainingCategoryList'
import { TrainingCategoryButtonElement } from 'components/page/training/TrainingCategoryButtonElement'
import { TrainingVideoList } from 'components/page/training/TrainingVideoList'
import { TrainingVideoElement } from 'components/page/training/TrainingVideoElement'

const { SEO } = APP_INFO

const TrainingPage: Page = () => (
  <>
    <TrainingCategoryList>
      <TrainingCategoryButtonElement>All</TrainingCategoryButtonElement>
      <TrainingCategoryButtonElement>Getting Started</TrainingCategoryButtonElement>
      <TrainingCategoryButtonElement>Customer Acquisition</TrainingCategoryButtonElement>
      <TrainingCategoryButtonElement>Driver Acquisition</TrainingCategoryButtonElement>
      <TrainingCategoryButtonElement>Open A Market</TrainingCategoryButtonElement>
      <TrainingCategoryButtonElement>Build An Empire</TrainingCategoryButtonElement>
    </TrainingCategoryList>

    <br />
    <br />

    <TrainingVideoList>
      <TrainingVideoElement src="https://player.vimeo.com/video/637569915?h=1ad208d002&title=0&byline=0&portrait=0&playsinline=0&autopause=0&app_id=122963" />
      <TrainingVideoElement src="https://player.vimeo.com/video/637569915?h=1ad208d002&title=0&byline=0&portrait=0&playsinline=0&autopause=0&app_id=122963" />
      <TrainingVideoElement src="https://player.vimeo.com/video/637569915?h=1ad208d002&title=0&byline=0&portrait=0&playsinline=0&autopause=0&app_id=122963" />
      <TrainingVideoElement src="https://player.vimeo.com/video/637569915?h=1ad208d002&title=0&byline=0&portrait=0&playsinline=0&autopause=0&app_id=122963" />
      <TrainingVideoElement src="https://player.vimeo.com/video/637569915?h=1ad208d002&title=0&byline=0&portrait=0&playsinline=0&autopause=0&app_id=122963" />
      <TrainingVideoElement src="https://player.vimeo.com/video/637569915?h=1ad208d002&title=0&byline=0&portrait=0&playsinline=0&autopause=0&app_id=122963" />
    </TrainingVideoList>
  </>
)

TrainingPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Training</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default TrainingPage
