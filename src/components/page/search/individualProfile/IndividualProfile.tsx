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
    <Container className='m-0 p-0 max-w-full flex flex-row'>
      <Container className='max-w-full w-[20%] p-0 my-4'>
        <Paper className={`${cname}-conatiner my-2 rounded-2xl shadow-[0_1px_17px_-1px_rgba(0,0,0,0.2)]`}>
          <InfoBanner profileData={profileData} userLevel={auth?.level} />
        </Paper>
      </Container>
      <Container className='max-w-full w-[80%] bg-white ml-4 my-6 rounded-2xl shadow-[0_1px_17px_-1px_rgba(0,0,0,0.2)]'>
        <Paper className={`${cname}-conatiner my-4 shadow-none`}>
          <IndividualProfileHeader body={body} setBody={setBody} profileData={profileData} userLevel={auth?.level} />
        </Paper>
        <Paper className={`${cname}-conatiner shadow-none`}>
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
