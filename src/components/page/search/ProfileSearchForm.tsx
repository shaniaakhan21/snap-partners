/* eslint-disable no-use-before-define */
import React from 'react'
import { Container, Paper } from '@mui/material'
import { ButtonComponent, InputComponent, SelectComponent } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
import { Person } from 'components/common/icons'

function ProfileSearchForm ({ children }) {
  const cname = 'profilePage-searchForm'
  return (
    <div>
      <Container>
        <Paper elevation={2} className={`${cname}-container`}>
          <div className={`${cname}-label`}>
            <Person />
            <p>Search Profile</p>
          </div>
          <div className={`${cname}`}>
            <div className='searchForm-inputContainer'>
              <InputComponent label={'profile search'} placeholder={'repID'} />
            </div>
            <div className='searchForm-inputContainer'>
              <SelectComponent label={'user level'} />
            </div>
            <div className='searchForm-ButtonContainer'>
              <ButtonComponent title={'search'} />
            </div>
          </div>
        </Paper>
      </Container>
      {children}
    </div>
  )
}

export default ProfileSearchForm
