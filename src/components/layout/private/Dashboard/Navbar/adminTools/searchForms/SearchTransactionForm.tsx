/* eslint-disable no-use-before-define */
import React from 'react'
import { ButtonComponent, InputComponent, SelectComponent } from './Components'

function SearchTransactionForm () {
  return (
    <div>
      <form>
      <InputComponent label={'Order Id'} placeholder={'Order ID/Customer ID'} />
      <SelectComponent label={'status'} name={'status'} />
      <ButtonComponent title={'submit'} />
      </form>
    </div>
  )
}

export default SearchTransactionForm
