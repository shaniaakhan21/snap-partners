/* eslint-disable no-use-before-define */
import React from 'react'
import { ButtonComponent, InputComponent } from './Components'

function SearchDownlineForm () {
  return (
    <div>
      <InputComponent label={'profile Search'} placeholder={'RepID, Name or Email '} />
      <ButtonComponent title={'submit'} />
    </div>
  )
}

export default SearchDownlineForm
