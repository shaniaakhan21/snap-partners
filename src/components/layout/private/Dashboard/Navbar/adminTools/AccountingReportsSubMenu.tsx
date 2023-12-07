/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import router from 'next/router'
import ReportsSubMenu from './1099ReportsSubMenu'

function AdminToolMainMenu () {
  const [subMenu, setSubMenu] = useState('none')
  const [menuOpen, setMenuOpen] = useState(true)
  const menuData = [
    {
      icon: '',
      title: 'Field Promotions',
      page: '/StarAchiever'
    },
    {
      icon: '',
      title: '1099 Resolution',
      submenu: 'reports1099'
    }
  ]

  useEffect(() => {
    router.events.on('routeChangeStart', closeMenu)
    return () => {
      router.events.off('routeChangeStart', closeMenu)
    }
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const handleMenuClick = (menuItem) => {
    setSubMenu(subMenu === menuItem.submenu ? 'none' : menuItem.submenu)
    router.push(menuItem.page)
  }

  return (
    <>
      {menuOpen && (
        <div className='admin-tool-sub-container'>

          <ul>
            {
              menuData.map((menuItem, index) => (
                <li
                  key={index}
                  className={`item-${index} menuItem text-sm sm:text-base`}
                  onClick={() => handleMenuClick(menuItem)}
                  style={{ cursor: 'pointer' }}
                >
                  {menuItem.title}
                </li>
              ))
            }
          </ul>

          {subMenu && subMenu === 'fieldpromotion' ? <></> : <></>}
          {
            subMenu && subMenu === 'reports1099'
              ? <ReportsSubMenu />
              : <></>
          }
        </div>
      )
      }
    </>
  )
}

export default AdminToolMainMenu
