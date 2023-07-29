/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import { Container, Paper } from '@mui/material'
import IndividualProfileHeader from './IndividualProfileHeader'
import IBOProfile from './IBOProfile'
import Order from './Order'
import Downline from './Downline'
import CommissionsTab from './ComissionsTab'
import Upline from './Upline'
import InfoBanner from './InfoBanner'
import { useAuthStore } from 'lib/stores'

function IndividualProfile ({ profileData }) {
  const cname = 'profilePage-individualProfile'
  const [body, setBody] = useState<'iboProfile' | 'order' | 'downline' | 'comissions' | 'upline'>('iboProfile')
  const { auth } = useAuthStore()
  console.log('body is ', body)
  return (
    <Container>
      <Paper className={`${cname}-conatiner`}>
        <IndividualProfileHeader body={body} setBody={setBody} profileData={profileData} userLevel={auth?.level} />
      </Paper>
      <Paper className={`${cname}-conatiner`}>
        <InfoBanner profileData={profileData} userLevel={auth?.level} />
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
          body === 'upline'
            ? <Upline id={profileData[0]?.id}/>
            : <></>
        }

      </Paper>
    </Container>
  )
}

export default IndividualProfile
