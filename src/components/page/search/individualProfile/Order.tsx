/* eslint-disable no-use-before-define */
import { OrderIcon } from 'components/common/icons'
import { ButtonComponent, InputComponent, SelectComponent } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
import React from 'react'

function Order () {
  const cname = 'profilePage-order'
  return (
    <div className={`${cname}-container`}>
      <div className={`${cname}-heading`}><img src='' /><OrderIcon /><p>Search Order</p></div>
      <div className={`${cname}-form-container`}>
        <div className={`${cname}-input`}>
          <InputComponent label={'order ID'} placeholder={'Item ID or Customer ID'} />
        </div>

        <div className={`${cname}-input`}>
          <SelectComponent label={'Amount Paid'} name={'amountPaid'} />
        </div>

        <div className={`${cname}-input`}>
          <SelectComponent label={'Shipped ON'} name={'shippedOn'} />
        </div>
      </div>

      <div className={`${cname}-form-container`}>

        <div className={`${cname}-input`}>
          <SelectComponent label={'country'} name={'country'} />
        </div>

        <div className={`${cname}-input`}>
          <SelectComponent label={'warehouse'} name={'wareHouse'} />
        </div>

        <div className={`${cname}-input`}>
          <InputComponent label={'product ID'} placeholder={'000-123-ASD'} />
        </div>
      </div>

      <div className={`${cname}-button-container`}>
        <ButtonComponent title={'Search'} />
      </div>
    </div>
  )
}

export default Order
