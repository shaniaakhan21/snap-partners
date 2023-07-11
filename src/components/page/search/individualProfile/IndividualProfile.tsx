/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import { Container, Paper } from '@mui/material'
import IndividualProfileHeader from './IndividualProfileHeader'
import IBOProfile from './IBOProfile'
import Order from './Order'

function IndividualProfile ({ profileData }) {
  const cname = 'profilePage-individualProfile'
  const [body, setBody] = useState<'iboProfile' | 'order'>('iboProfile')
  console.log('body is ', body)
  return (
    <Container>
      <Paper className={`${cname}-conatiner`}>
        <IndividualProfileHeader body={body} setBody={setBody} />
        {
          body === 'iboProfile'
            ? <IBOProfile profileData={profileData} />
            : <></>
        }
        {
          body === 'order'
            ? <Order />
            : <></>
        }
      </Paper>
    </Container>
  )
}

export default IndividualProfile
