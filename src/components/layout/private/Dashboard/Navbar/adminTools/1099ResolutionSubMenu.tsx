/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import Link from 'next/link'

function ResolutionSubMenu ({ isVisible }) {
  return (
    <>
      {isVisible && (

        <ul className='admin-tool-sub-container right-[101%]'>
          <Link href='/1099-report' passHref><li className='item-0 sub-list-items font-xs sm:font-base'

            style={{ cursor: 'pointer' }}>Individual</li></Link>
          <Link href='/1099-business-report' passHref><li className='item-1 sub-list-items font-xs sm:font-base'
            style={{ cursor: 'pointer' }}>Business</li></Link>
        </ul>
      )
      }
    </>
  )
}

export default ResolutionSubMenu
