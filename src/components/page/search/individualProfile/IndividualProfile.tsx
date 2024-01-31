/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import { Container, Paper } from '@mui/material'
import IndividualProfileHeader from './IndividualProfileHeader'
import IBOProfile from './IBOProfile'
import Order from './Order'
import Downline from './Downline'
import CommissionsTab from './ComissionsTab'
import Upline from './Upline'
import IndividualDashboard from './IndividualDashboard'
import InfoBanner from './InfoBanner'
import Reports from './reports/Reports'
import { useAuthStore } from 'lib/stores'

function IndividualProfile ({ profileData }) {
  const cname = 'profilePage-individualProfile'
  const [body, setBody] = useState<'iboProfile' | 'order' | 'downline' | 'comissions' | 'upline' | 'dashboard' | 'reports'>('iboProfile')
  const { auth } = useAuthStore()
  console.log('body is ', body)
  return (
    <Container className='border-2 border-red-500 m-0 p-0 max-w-full flex flex-row'>
      <Container className='max-w-full w-[30%] p-0'>
        <Paper className={`${cname}-conatiner my-2`}>
          <InfoBanner profileData={profileData} userLevel={auth?.level} />
        </Paper>
      </Container>
      <Container className='max-w-full w-[70%]'>
        <Paper className={`${cname}-conatiner my-4`}>
          <IndividualProfileHeader body={body} setBody={setBody} profileData={profileData} userLevel={auth?.level} />
        </Paper>
        <Paper className={`${cname}-conatiner`}>
          {
            body === 'iboProfile'
              ? <IBOProfile profileData={profileData} userLevel={auth?.level} />
              : <></>
          }
          {
            body === 'order'
              ? <Order />
              : <></>
          }
          {
            body === 'downline'
              ? <Downline profileData= {profileData} />
              : <></>
          }
          {
            body === 'comissions'
              ? <CommissionsTab userId={profileData[0]?.id} />
              : <></>
          }
          {
            body === 'dashboard'
              ? <IndividualDashboard userId={profileData[0]?.id} />
              : <></>
          }
          {
            body === 'upline'
              ? <Upline id={profileData[0]?.id} currentUserLevel={auth?.level}/>
              : <></>
          }
          {
            body === 'reports'
              ? <Reports userId={profileData[0]?.id}/>
              : <></>
          }

        </Paper>
      </Container>
    </Container>
  )
}

export default IndividualProfile
