/* eslint-disable no-use-before-define */
import React from 'react'
import { ButtonComponent, InputComponent, SelectComponent } from './Components'

function SearchProfileForm () {
  return (
    <div>
      <InputComponent label={'Profile Search'} placeholder={'RepID, Name or Email '} />
      <SelectComponent label={'User Level'} />
      <ButtonComponent title={'submit'} />
    </div>
  )
}

export default SearchProfileForm
