/* eslint-disable no-use-before-define */
import IndividualProfile from 'components/page/search/individualProfile/IndividualProfile'
import ProfileSearchForm from 'components/page/search/ProfileSearchForm'
import DashboardLayout from 'layouts/private/Dashboard'
import React, { useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from 'lib/utils/localStorage'
import axios from 'axios'
import { useRouter } from 'next/router'

function ProfileSearch () {
  const router = useRouter()
  const { id } = router.query
  const [grandFatherData, setGrandFatherData] = useState()
  const [profileData, setProfileData] = useState([])
  const getProfileData = async () => {
    const token = getLocalStorage('accessToken')
    await axios.get('/api/user/getUserById', {
      params: {
        id: id
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((result) => {
        console.log('ret from individual profile', result.data.data)
        setProfileData([result.data.data])
      })
      .catch((e) => {
        console.log('error while getting profile', e)
      })
  }
  const getGrandfatherRank = async () => {
    const token = getLocalStorage('accessToken')
    await axios.get(`/api/admin/user-getGrandfatherRanks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((result) => {
        console.log('ret from individual grandfatherData', result.data)
        setGrandFatherData(result.data)
      })
      .catch((e) => {
        console.log('error while getting profile', e)
      })
  }
  useEffect(() => {
    getProfileData()
    getGrandfatherRank()
  }, [router.query])
  console.log('The grandfather Rank Data Is', grandFatherData)
  return (
    <DashboardLayout>
      <ProfileSearchForm>
        <IndividualProfile profileData= {profileData} />
      </ProfileSearchForm>
    </DashboardLayout>
  )
}

export default ProfileSearch
