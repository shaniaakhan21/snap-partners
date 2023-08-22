/* eslint-disable @next/next/link-passhref */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import Link from 'next/link'
import AdvanceSearchSubMenu from './AdvanceSearchSubMenu'

function AdminToolMainMenu () {
  const [subMenu, setSubMenu] = useState('none')
  const [menuOpen, setMenuOpen] = useState(true)
  const menuData = [
    {
      icon: '',
      title: 'Advance Search',
      submenu: 'advanceSearch'
    },
    {
      icon: '',
      title: 'Accounting Reports',
      submenu: 'accountingReports'
    },
    {
      icon: '',
      title: 'Product Database'
    },
    {
      icon: '',
      title: 'Billing Run'
    },
    {
      icon: '',
      title: 'Rewards Program'
    }
  ]

  if (!menuOpen) return null

  return (
    <div className='admin-tool-main-menu-container'>
      {menuOpen && (
        <ul>
          {menuData.map((menuItem, index) => {
            if (menuItem.title === 'Accounting Reports') {
              return (
                <Link key={index} href="/Accounting">
                  <li
                    className={`item-${index} menuItem`}
                    onClick={() => {
                      setMenuOpen(false) // Close the menu when "Accounting Reports" is clicked
                    }}
                  >
                    {menuItem.title}
                  </li>
                </Link>
              )
            }

            return (
              <li
                key={index}
                className={`item-${index} menuItem`}
                onClick={() => {
                  setSubMenu(
                    subMenu === menuItem.submenu ? 'none' : menuItem.submenu
                  )
                }}
              >
                {menuItem.title}
              </li>
            )
          })}
        </ul>
      )}

      {subMenu === 'advanceSearch' ? <AdvanceSearchSubMenu /> : null}
    </div>
  )
}

export default AdminToolMainMenu
