/* eslint-disable no-useless-return */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import { ButtonComponent, InputComponent, SelectComponent } from './Components'
import { userLevelOptions } from './formOptionData'
import { useRouter } from 'next/router'
interface IProfileSearchForm {
  profileSearchString: string | number
  userLevel: string
}
function SearchProfileForm () {
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
          console.log('in this')
          setProfileSearchForm({ ...profileSearchForm, profileSearchString: val.replace(/(\+\d{1})(\d{3})/, '$1($2)') })
        }else if (val.length === 11) {
          console.log('in that')
          setProfileSearchForm({ ...profileSearchForm, profileSearchString: val.replace(/(.{7})(\d{4})/, '$1-$2-') })
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
      console.log('clkd')
      const plainSearchString = value.profileSearchString.replace(/[()-]/g, '')
      window.location.href = `/search/${plainSearchString}/noLevel`
      // router.push()
    } else if (value.userLevel !== '' && value.profileSearchString === '') {
      window.location.href = `/search/noName/${value.userLevel}`
    } else if (value.userLevel === '' && value.profileSearchString === '') {
      return
    } else {
      window.location.href = `/search/${value.profileSearchString}/${value.userLevel}`
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, profileSearchForm)}>
      <InputComponent label={'Profile Search'} placeholder={'PhoneNum(use +),ID,Name,Email'} value={profileSearchForm.profileSearchString} onChangeFunction={setProfileSearchInput} param={'profileSearchString'}/>
      <SelectComponent label={'User Level'} name={'userLevel'} options={userLevelOptions} onChangeFunction={setProfileSearchInput} param={'userLevel'} />
      <ButtonComponent title={'submit'} />
    </form>
  )
}

export default SearchProfileForm
