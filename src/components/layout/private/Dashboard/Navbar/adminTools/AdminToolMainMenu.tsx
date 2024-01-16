/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import AdvanceSearchSubMenu from './AdvanceSearchSubMenu'
import AccountingReportsSubMenu from './AccountingReportsSubMenu'
import router from 'next/router'

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

  useEffect(() => {
    // Listen for route changes
    router.events.on('routeChangeStart', closeMenu)

    // Clean up the event listener when the component unmounts
    return () => {
      router.events.off('routeChangeStart', closeMenu)
    }
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <>
      {menuOpen && (
        <div className='admin-tool-main-menu-container'>

          <ul>
            {
              menuData.map((menuItem, index) => (
                <li className={`item-${index} menuItem text-sm sm:text-base duration-500 rounded-3xl font-semibold`} onClick={() => {
                  setSubMenu(subMenu === menuItem.submenu ? 'none' : menuItem.submenu)
                }}>{menuItem.title}</li>
              ))
            }
          </ul>

          { subMenu && subMenu === 'advanceSearch'
            ? <AdvanceSearchSubMenu />
            : <></>
          }
          {
            subMenu && subMenu === 'accountingReports'
              ? <AccountingReportsSubMenu />
              : <></>
          }
        </div>
      )
      }
    </>
  )
}

export default AdminToolMainMenu
