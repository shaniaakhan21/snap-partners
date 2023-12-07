/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import Link from 'next/link'

function ReportsSubMenu () {
  const [menuOpen, setMenuOpen] = useState(true)

  return (
    <>
      {menuOpen && (
        <ul className='admin-tool-sub-container'>
          <Link href='/1099-report' passHref><li className='item-0 sub-list-items font-xs sm:font-base' onClick={() => {
            setMenuOpen(false)
          }}

          style={{ cursor: 'pointer' }}>Individual</li></Link>
          <Link href='/1099-business-report' passHref><li className='item-1 sub-list-items font-xs sm:font-base' onClick={() => {
            setMenuOpen(false)
          }}

          style={{ cursor: 'pointer' }}>Business</li></Link>
        </ul>
      )
      }
    </>
  )
}

export default ReportsSubMenu
