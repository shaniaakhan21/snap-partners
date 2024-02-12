/* eslint-disable no-useless-return */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react'
import { Container, Paper } from '@mui/material'
import { ButtonComponent, InputComponent, SelectComponent } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
import { Person } from 'components/common/icons'
import { useRouter } from 'next/router'
import { userLevelOptions } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/formOptionData'

interface IProfileSearchForm {
    profileSearchString: string | number
    userLevel: string
  }

function ProfileSearchForm ({ children }) {
  const cname = 'profilePage-searchForm'
  const [profileSearchForm, setProfileSearchForm] = useState<IProfileSearchForm>({
    profileSearchString: '',
    userLevel: ''
  })

  const router = useRouter()
  const setProfileSearchInput = (event, param) => {
    if (param === 'profileSearchString') {
      const val = event.target.value as string
      if (val.match(/\+\d+/)) {
        if (val.length === 5) {
          setProfileSearchForm({ ...profileSearchForm, profileSearchString: val.replace(/(\+\d{1})(\d{3})/, '$1($2)') })
        } else if (val.length === 10) {
          setProfileSearchForm({ ...profileSearchForm, profileSearchString: val.replace(/(.{7})(\d{3})/, '$1 $2-') })
        } else {
          setProfileSearchForm({ ...profileSearchForm, profileSearchString: event.target.value })
        }
        // setProfileSearchForm({ ...profileSearchForm, profileSearchString: val.replace(/(\d{3})(\d{4})(\d{3})/, '($1)-$2-$3') })
      } else {
        setProfileSearchForm({ ...profileSearchForm, profileSearchString: event.target.value })
      }
    }
    if (param === 'userLevel') { setProfileSearchForm({ ...profileSearchForm, userLevel: event.target.value }) }
  }

  const handleSubmit = (e, value) => {
    e.preventDefault()
    if (value.profileSearchString !== '' && value.userLevel === '') {
      if (value.profileSearchString.match(/\+.+/)) {
        const plainSearchString = value.profileSearchString.replace(/[\s()-]+/g, '')
        window.location.href = `/search/${plainSearchString}/noLevel`
      } else {
        window.location.href = `/search/${value.profileSearchString}/noLevel`
      }
    } else if (value.userLevel !== '' && value.profileSearchString === '') {
      window.location.href = `/search/noName/${value.userLevel}`
    } else if (value.userLevel === '' && value.profileSearchString === '') {
      return
    } else {
      window.location.href = `/search/${value.profileSearchString}/${value.userLevel}`
    }
  }
  useEffect(() => {
    let searchString = router.query.searchString as string
    if (searchString && searchString?.match(/\+\d+/)) {
      searchString = (router.query.searchString as string).replace(/(\+\d{1})(\d{3})(\d{3})(\d{4})/, '$1($2) $3-$4')
    }
    setProfileSearchForm({ ...profileSearchForm, profileSearchString: typeof router.query.searchString === 'string' && router.query.searchString !== 'noName' ? searchString : '', userLevel: typeof router.query.userLevel === 'string' && router.query.userLevel !== 'noLevel' ? router.query.userLevel : '' })
  }, [router.query])
  return (
    <div className='w-full  rounded-2xl'>
      <Container className='m-0 p-0 w-full max-w-full '>
        <Paper elevation={2} className={`${cname}-container`}>
          <div className={`${cname}-label`}>
            <p>Search Profile</p>
          </div>
          <form className={`${cname}`} onSubmit={(e) => handleSubmit(e, profileSearchForm)}>
            <div className='searchForm-inputContainer'>
              <InputComponent label={'profile search'} placeholder={'PhoneNum(use +),ID,Name,Email'} value={profileSearchForm.profileSearchString} onChangeFunction={setProfileSearchInput} param={'profileSearchString'} />
            </div>
            <div className='searchForm-inputContainer'>
              <SelectComponent label={'user level'} name={'userLevel'} options={userLevelOptions} value={profileSearchForm.userLevel} onChangeFunction={setProfileSearchInput} param={'userLevel'} />
            </div>
            <div className='searchForm-ButtonContainer'>
              <ButtonComponent title={'search'} />
            </div>
          </form>
        </Paper>
      </Container>
      {children}
    </div>
  )
}

export default ProfileSearchForm
