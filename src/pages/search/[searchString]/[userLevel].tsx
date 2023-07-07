/* eslint-disable no-use-before-define */
import React, { ReactNode, useState, useEffect } from 'react'
import DashboardLayout from 'layouts/private/Dashboard'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ProfileSearchForm from 'components/page/search/ProfileSearchForm'
import { userData } from 'lib/constants/mockUserData'
import SearchResult from 'components/page/search/SearchResult'

function ProfileSearch () {
  useEffect(() => {
    setSearchResult(userData)
  }, [])
  const [searchResult, setSearchResult] = useState([])
  const router = useRouter()
  const { searchString, userLevel } = router.query
  return (
    <div>
      <ProfileSearchForm>
        <SearchResult resultData={searchResult} />
      </ProfileSearchForm>

    </div>
  )
}

ProfileSearch.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>Profile Search</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default ProfileSearch
