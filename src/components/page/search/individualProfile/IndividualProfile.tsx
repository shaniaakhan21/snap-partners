/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import { Container, Paper } from '@mui/material'
import IndividualProfileHeader from './IndividualProfileHeader'

function IndividualProfile () {
  const cname = 'profilePage-individualProfile'
  const [body, setBody] = useState<'iboProfile'>('iboProfile')
  return (
    <Container>
      <Paper className={`${cname}-conatiner`}>
        <IndividualProfileHeader body={body} setBody={setBody} />
      </Paper>
    </Container>
  )
}

export default IndividualProfile
