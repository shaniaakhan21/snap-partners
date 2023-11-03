/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import Link from 'next/link'

function AccountingReportsSubMenu () {
  const [menuOpen, setMenuOpen] = useState(true)

  return (
    <>
      {menuOpen && (
        <ul className='subItem'>
          <Link href='/StarAchiever' passHref><li className='sub-list-items font-xs sm:font-base' onClick={() => {
            setMenuOpen(false)
          }}

          style={{ cursor: 'pointer' }}>Field Promotions</li></Link>
          <Link href='/1099-report' passHref><li className='sub-list-items font-xs sm:font-base' onClick={() => {
            setMenuOpen(false)
          }}

          style={{ cursor: 'pointer' }}>1099's</li></Link>
          <li className='sub-list-items font-xs sm:font-base'>Item 3</li>
          <li className='sub-list-items font-xs sm:font-base'>Item 4</li>
        </ul>
      )
      }
    </>
  )
}

export default AccountingReportsSubMenu
