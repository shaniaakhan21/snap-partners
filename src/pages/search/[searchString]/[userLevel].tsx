/* eslint-disable brace-style */
/* eslint-disable no-use-before-define */
import React, { ReactNode, useState, useEffect } from 'react'
import DashboardLayout from 'layouts/private/Dashboard'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ProfileSearchForm from 'components/page/search/ProfileSearchForm'
import { userData } from 'lib/constants/mockUserData'
import SearchResult from 'components/page/search/SearchResult'
import axios from 'axios'
import { getLocalStorage, setLocalStorage } from 'lib/utils/localStorage'

function ProfileSearch () {
  const getProfileData = async () => {
    let emailString = []
    let idString = []
    let userLevelString = ''
    if (userLevel !== 'noLevel' && typeof userLevel === 'string')
    {
      userLevelString = userLevel
    }
    const token = getLocalStorage('accessToken')
    if (searchString !== 'noName') {
      if (typeof searchString === 'string') {
        emailString = searchString.match(/^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,6}$/)
        idString = searchString.match(/^\d+$/)
      }
      console.log('in useEffect', emailString, idString)
      if (emailString)
      {
        console.log('email')
        await axios.get('/api/user/getUserByEmail', {
          params: {
            email: searchString,
            userLevelString: userLevelString || ''
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then((result) => {
            setSearchResult(result.data.result)
            console.log('ret from email search', result.data.result)
          })
          .catch((e) => {
            console.log('error while getting profile', e)
          })
      }

      else if (idString)
      {
        console.log('search by id id')
        await axios.get('/api/user/getUserById', {
          params: {
            id: searchString,
            userLevelString: userLevelString || ''
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then((result) => {
            setSearchResult([result.data.data])
            console.log('ret', result.data.data)
          })
          .catch((e) => {
            console.log('error while getting profile', e)
          })
      }
      else
      {
        console.log('search by name')
        if (typeof searchString === 'string')
        {
        // const newStr = searchString.split(' ')
        // const name = newStr[0]
        // const lastname = newStr[1]
        // let params = {}
        // if (name)
        // {
        //   params = {
        //     ...params,
        //     name: name
        //   }
        // }
        // if (lastname)
        // {
        //   params = {
        //     ...params,
        //     lastname: lastname
        //   }
        // }
          await axios.get('/api/user/getUserByName', {
            params: {
              name: searchString,
              userLevelString: userLevelString || ''
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then((result) => {
              setSearchResult(result.data.result)
            })
            .catch((e) => {
              console.log('error while getting profile', e)
            })
        }
      }
    }
    else{
        await axios.get('/api/user/getUserByLevel', {
            params: {
              userLevelString: userLevelString || ''
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then((result) => {
              setSearchResult(result.data.result)
            })
            .catch((e) => {
              console.log('error while getting profile', e)
            })
    }
  }

  useEffect(() => {
    getProfileData()
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
