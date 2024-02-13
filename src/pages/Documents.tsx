/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import type { ReactNode } from 'lib/types'
import DashboardLayout from 'layouts/private/Dashboard'
import { APP_INFO } from 'config/appInfo'
import { CategoryChip } from 'components/page/Documents/CategoryChip'
import { CategoryChipList } from 'components/page/Documents/CategoryChipList'
import DocumentCard from 'components/page/Documents/DocumentCard'
import { Grid } from '@mui/material'
import axios from 'axios'
import { Spinner } from 'components/common/loaders'

const { SEO } = APP_INFO
const Documents = () => {
  const [Category, setCategory] = useState('0')
  const [categoryData, setCategoryData] = useState(null)
  const [categoryFiles, setCategoryFiles] = useState(null)
  const [totalFiles, setTotalFiles] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCategory = async (e) => {
    if (e.target.id == 0) {
      setCategoryFiles(totalFiles)
      setCategory('0')
    } else {
      setCategoryFiles(totalFiles.filter((file) => file.categoryId == parseInt(e.target.id)))
      setCategory(e.target.id)
    }
    // fetchFile(parseInt(e.target.id))
  }

  const fetchFile = async (categoryId) => {
    setLoading(true)
    if (categoryId === 0) {
      await axios.get('/api/document/file')
        .then(async (response) => {
          setCategoryFiles(response.data.result)
          setTotalFiles(response.data.result)
          setLoading(false)
        })
      return
    }
    await axios.get(`/api/document/file/${categoryId}`)
      .then((response) => {
        setCategoryFiles(response.data.result)
        setLoading(false)
      })
  }
  const fetchCategory = async () => {
    await axios.get('/api/document/category')
      .then((response) => {
        setCategoryData(response?.data?.result)
      })
  }
  useEffect(() => {
    fetchCategory()
    fetchFile(0)

    // setLocalStorage('documentFiles', categoryFiles)
  }, [])
  return (
    <>
      <div>
        <CategoryChipList>
          <CategoryChip
            id={'0'}
            categoryId = {0}
            categorySelected={Category}
            onClick={handleCategory}
            className='md:rounded-l-3xl'
          >
          All
          </CategoryChip>
          {categoryData
            ? categoryData.map((cat: { categoryId: number, categoryName: string }, index: number) => (
              <CategoryChip
                id={`${cat?.categoryId}`}
                categoryId = {cat?.categoryId}
                categorySelected={Category}
                onClick={handleCategory}
                isLastItem={index === categoryData.length - 1}
              >
                {cat?.categoryName}
              </CategoryChip>
            ))
            : <></>}
        </CategoryChipList>
      </div>
      { !loading
        ? <div className='document-cards mt-8'>
          <Grid container spacing={2}>
            { categoryFiles
              ? categoryFiles.map((file) => (
                <DocumentCard file={file} />
              ))
              : <></>}
          </Grid>
        </div>
        : <><Spinner /></>
      }
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
