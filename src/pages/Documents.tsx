/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import type { Page, ReactNode } from 'lib/types'
import DashboardLayout from 'layouts/private/Dashboard'
import { APP_INFO } from 'config/appInfo'
import { CategoryChip } from 'components/page/Documents/CategoryChip'
import { CategoryChipList } from 'components/page/Documents/CategoryChipList'
import DocumentCard from 'components/page/Documents/DocumentCard'
import { Grid } from '@mui/material'
import { dummyData } from 'components/page/Documents/DocumentDummyData'
import axios from 'axios'

const { SEO } = APP_INFO
const Documents = () => {
  const [Category, setCategory] = useState('0')
  const [categoryData, setCategoryData] = useState(null)
  const [categoryFiles, setCategoryFiles] = useState(null)

  const handleCategory = async (e) => {
    console.log('category changed', e.target.id)
    setCategory(e.target.id)
    fetchFile(parseInt(e.target.id))
  }

  const fetchFile = async (categoryId) => {
    console.log('category id we are getting', categoryId)
    if (categoryId === 0) {
      await axios.get(`https://snap249-admin.snap.devopsteam.info/api/document/file`)
        .then((response) => {
          console.log('result we get from function', response)
          setCategoryFiles(response.data.result)
        })
      return
    }
    await axios.get(`https://snap249-admin.snap.devopsteam.info/api/document/file/${categoryId}`)
      .then((response) => {
        console.log('result we get from function', response)
        setCategoryFiles(response.data.result)
      })
  }
  const fetchCategory = async () => {
    await axios.get('https://snap249-admin.snap.devopsteam.info/api/document/category')
      .then((response) => {
        setCategoryData(response?.data?.result)
      })
  }
  useEffect(() => {
    fetchCategory()
    fetchFile(0)
  }, [])

  console.log('dummy data is', categoryData)
  console.log('files we are sending', categoryFiles)
  return (
    <>
      <div>Documents</div>
      <div>
        <CategoryChipList>
          <CategoryChip
            id={'0'}
            categoryId = {0}
            categorySelected={Category}
            onClick={handleCategory}
          >
          All
          </CategoryChip>
          {categoryData
            ? categoryData.map((cat) => (
              <CategoryChip
                id={`${cat?.categoryId}`}
                categoryId = {cat?.categoryId}
                categorySelected={Category}
                onClick={handleCategory}
              >
                {cat?.categoryName}
              </CategoryChip>
            ))
            : <></>}
          {/* <CategoryChip
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
          </CategoryChip> */}
        </CategoryChipList>
      </div>
      <div className='document-cards'>
        <Grid container spacing={2}>
          <DocumentCard categoryFiles = {categoryFiles} />
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
