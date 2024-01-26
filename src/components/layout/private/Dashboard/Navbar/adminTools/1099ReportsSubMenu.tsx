/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import Link from 'next/link'

function ReportsSubMenu ({ isVisible }) {
  const [menuOpen, setMenuOpen] = useState(true)

  return (
    <>
      {isVisible && (
        <ul className='admin-tool-sub-container right-[101%]'>
          <Link href='/1099-individual-report-export' passHref><li className='item-0 sub-list-items rounded-3xl font-xs sm:font-base'
            style={{ cursor: 'pointer' }}>Individual</li></Link>
          <Link href='/1099-business-report-export' passHref><li className='item-1 rounded-3xl sub-list-items font-xs sm:font-base'

            style={{ cursor: 'pointer' }}>Business</li></Link>
        </ul>
      )
      }
    </>
  )
}

export default ReportsSubMenu
