/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import { ButtonComponent, InputComponent, SelectComponent } from './Components'
import { userLevelOptions } from './formOptionData'
import { useRouter } from 'next/router'
interface IProfileSearchForm {
  profileSearchString: string | number
  userLevel: number
}
function SearchProfileForm () {
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
      console.log("clkd")
      window.location.href = `/search/${value.profileSearchString}/${value.userLevel}`
      // router.push()
    }
  }

  return (
    <div>
      <InputComponent label={'Profile Search'} placeholder={'RepID, Name or Email '} value={profileSearchForm.profileSearchString} onChangeFunction={setProfileSearchInput} param={'profileSearchString'}/>
      <SelectComponent label={'User Level'} name={'userLevel'} options={userLevelOptions} onChangeFunction={setProfileSearchInput} param={'userLevel'} />
      <ButtonComponent title={'submit'} onClickFunction={handleSubmit} param={profileSearchForm} />
    </div>
  )
}

export default SearchProfileForm
