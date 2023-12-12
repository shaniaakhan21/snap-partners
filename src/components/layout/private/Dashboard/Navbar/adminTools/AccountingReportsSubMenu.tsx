/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ReportsSubMenu from './1099ReportsSubMenu'
import { useAuthStore } from 'lib/stores'

function AdminToolMainMenu () {
  const [subMenu, setSubMenu] = useState('none')
  const [menuOpen, setMenuOpen] = useState(true)
  const auth = useAuthStore()
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
  const router = useRouter()
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
    if (router) {
      if (menuItem.page !== undefined) {
        router.push(menuItem.page)
      } else if (menuItem.submenu) {
        setSubMenu(subMenu === menuItem.submenu ? 'none' : menuItem.submenu)
      } else {
        console.warn('No page or submenu defined for this menu item')
      }
    }
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
