/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import type { Page, ReactNode } from 'lib/types'
import DashboardLayout from 'layouts/private/Dashboard'
import { APP_INFO } from 'config/appInfo'
import { CategoryChip } from 'components/page/training/CategoryChip'
import { CategoryChipList } from 'components/page/training/CategoryChipList'
import DocumentCard from 'components/page/Documents/DocumentCard'
import { Grid } from '@mui/material'
import { dummyData } from 'components/page/Documents/DocumentDummyData'

const { SEO } = APP_INFO
const Documents = () => {
  const [Category, setCategory] = useState('all')

  const handleCategory = (e) => {
    console.log('category changed', e.target.id)
    setCategory(e.target.id)
  }

  console.log('dummy data is', dummyData[1].title)
  return (
    <>
      <div>Documents</div>
      <div>
        <CategoryChipList>
          <CategoryChip
            id='all'
            categorySelected={Category}
            onClick={handleCategory}
          >
          All
          </CategoryChip>
          <CategoryChip
            id='docs'
            categorySelected={Category}
            onClick={handleCategory}
          >
         Documents
          </CategoryChip>
          <CategoryChip
            id='compPlan'
            categorySelected={Category}
            onClick={handleCategory}
          >
          Compensation Plan
          </CategoryChip>
          <CategoryChip
            id='cProsp'
            categorySelected={Category}
            onClick={handleCategory}
          >
          Client Prospectus
          </CategoryChip>
          <CategoryChip
            id='adDocs'
            categorySelected={Category}
            onClick={handleCategory}
          >
          Admin Documents
          </CategoryChip>
          <CategoryChip
            id='mMaterials'
            categorySelected={Category}
            onClick={handleCategory}
          >
          Marketing Materials
          </CategoryChip>
          <CategoryChip
            id='tMaterials'
            categorySelected={Category}
            onClick={handleCategory}
          >
          Training Materials
          </CategoryChip>
        </CategoryChipList>
      </div>
      <div className='document-cards'>
        <Grid container spacing={2}>
          { Array.apply(0, Array(7)).map((index) => {
            const a = Math.floor(Math.random() * 5)
            return (

              <DocumentCard title={dummyData[a].title} description={dummyData[a].Description} imgUrl={dummyData[a].imgUrl} />

            )
          })
          }
        </Grid>
      </div>
    </>
  )
}

Documents.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Documents</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default Documents
