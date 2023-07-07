/* eslint-disable no-use-before-define */
import React from 'react'
import { ButtonComponent, InputComponent, SelectComponent } from './Components'

function SearchTransactionForm () {
  return (
    <div>
      <InputComponent label={'Order Id'} placeholder={'Order ID/Customer ID'} />
      <SelectComponent label={'status'} />
      <ButtonComponent title={'submit'} />
    </div>
  )
}

export default SearchTransactionForm
