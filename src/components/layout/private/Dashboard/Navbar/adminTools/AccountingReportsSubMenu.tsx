/* eslint-disable no-use-before-define */
import React from 'react'
import Link from 'next/link'

function AccountingReportsSubMenu () {
  return (
    <ul className='subItem'>
      <Link href='/StarAchiever' passHref><li className='sub-list-items' >Field Promotions</li></Link>
      <li className='sub-list-items'>Item 2</li>
      <li className='sub-list-items'>Item 3</li>
      <li className='sub-list-items'>Item 4</li>
    </ul>
  )
}

export default AccountingReportsSubMenu
