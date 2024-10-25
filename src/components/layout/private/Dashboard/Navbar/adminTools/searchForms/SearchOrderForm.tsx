/* eslint-disable no-use-before-define */
import React from 'react'
import { ButtonComponent, InputComponent, SelectComponent } from './Components'

function SearchOrderForm () {
  return (
    <div>
      <InputComponent label={'order id'} placeholder={'ItemID or CustomerID'} />
      <InputComponent label={'amount paid'} placeholder={'Amount'} />
      <SelectComponent label={'Shipped on'} name={'shippedOn'} />
      <SelectComponent label={'country'} name={'country'} />
      <SelectComponent label={'Warehouse'} name={'warehouse'} />
      <InputComponent label={'Product ID'} placeholder={'000-693-ASD'} />
      <ButtonComponent title={'submit'} />
    </div>
  )
}

export default SearchOrderForm
