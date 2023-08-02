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
    if (param === 'profileSearchString') { setProfileSearchForm({ ...profileSearchForm, profileSearchString: event.target.value }) }
    if (param === 'userLevel') { setProfileSearchForm({ ...profileSearchForm, userLevel: event.target.value }) }
  }

  const handleSubmit = (e, value) => {
    e.preventDefault()
    if (value.profileSearchString !== '' && value.userLevel === '') {
      console.log('clkd')
      window.location.href = `/search/${value.profileSearchString}/noLevel`
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
      <InputComponent label={'Profile Search'} placeholder={'RepID, Name or Email '} value={profileSearchForm.profileSearchString} onChangeFunction={setProfileSearchInput} param={'profileSearchString'}/>
      <SelectComponent label={'User Level'} name={'userLevel'} options={userLevelOptions} onChangeFunction={setProfileSearchInput} param={'userLevel'} />
      <ButtonComponent title={'submit'} />
    </form>
  )
}

export default SearchProfileForm
