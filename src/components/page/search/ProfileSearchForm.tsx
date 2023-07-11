/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import { Container, Paper } from '@mui/material'
import { ButtonComponent, InputComponent, SelectComponent } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
import { Person } from 'components/common/icons'
import { useRouter } from 'next/router'
import { userLevelOptions } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/formOptionData'

interface IProfileSearchForm {
    profileSearchString: string | number
    userLevel: number
  }

function ProfileSearchForm ({ children }) {
  const cname = 'profilePage-searchForm'
  const [profileSearchForm, setProfileSearchForm] = useState<IProfileSearchForm>({
    profileSearchString: '',
    userLevel: 0
  })

  const router = useRouter()
  const setProfileSearchInput = (event, param) => {
    if (param === 'profileSearchString') { setProfileSearchForm({ ...profileSearchForm, profileSearchString: event.target.value }) }
    if (param === 'userLevel') { setProfileSearchForm({ ...profileSearchForm, userLevel: event.target.value }) }
  }

  const handleSubmit = (value) => {
    if (value.profileSearchString !== '' && value.userLevel !== '') {
      console.log("clkd from main form")
      window.location.href = `/search/${value.profileSearchString}/${value.userLevel}`
      // router.push()
    }
  }
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
              <InputComponent label={'profile search'} placeholder={'repID, Name or Email'} value={profileSearchForm.profileSearchString} onChangeFunction={setProfileSearchInput} param={'profileSearchString'} />
            </div>
            <div className='searchForm-inputContainer'>
              <SelectComponent label={'user level'} name={'userLevel'} options={userLevelOptions} onChangeFunction={setProfileSearchInput} param={'userLevel'} />
            </div>
            <div className='searchForm-ButtonContainer'>
              <ButtonComponent title={'search'} onClickFunction={handleSubmit} param={profileSearchForm} />
            </div>
          </div>
        </Paper>
      </Container>
      {children}
    </div>
  )
}

export default ProfileSearchForm
