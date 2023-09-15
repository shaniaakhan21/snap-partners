/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import Link from 'next/link'

function AccountingReportsSubMenu () {
  const [menuOpen, setMenuOpen] = useState(true)

  return (
    <>
      {menuOpen && (
        <ul className='subItem'>
          <Link href='/StarAchiever' passHref><li className='sub-list-items' onClick={() => {
            setMenuOpen(false)
          }}

          style={{ cursor: 'pointer' }}>Field Promotions</li></Link>
          <li className='sub-list-items'>Item 2</li>
          <li className='sub-list-items'>Item 3</li>
          <li className='sub-list-items'>Item 4</li>
        </ul>
      )
      }
    </>
  )
}

export default AccountingReportsSubMenu
