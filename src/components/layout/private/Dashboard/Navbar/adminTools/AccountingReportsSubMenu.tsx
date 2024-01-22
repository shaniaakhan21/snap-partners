/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from 'lib/stores'
import Submenu_1099 from './1099SubMenu'

function AdminToolMainMenu () {
  const [subMenu, setSubMenu] = useState('none')
  const [menuOpen, setMenuOpen] = useState(true)
  const [clickedMenus, setClickedMenu] = useState([])
  const auth = useAuthStore()
  const menuData = [
    {
      icon: '',
      title: 'Field Promotions',
      page: '/StarAchiever'
    },
    {
      icon: '',
      title: '1099',
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
        setSubMenu(
          subMenu === menuItem.submenu ? 'none' : menuItem.submenu
        )
        setClickedMenu(menuItem.submenu)
      } else {
        console.warn('No page or submenu defined for this menu item')
      }
    }
  }
  return (
    <>
      {menuOpen && (
        <div className='admin-tool-sub-container right-[101%]'>

          <ul>
            {
              menuData.map((menuItem, index) => (
                <li
                  key={index}
                  className={`item-${index} menuItem rounded-3xl text-sm sm:text-base`}
                  onClick={() => handleMenuClick(menuItem)}
                  style={{
                    backgroundColor: clickedMenus.includes(menuItem.submenu) ? '#E74426' : '',
                    cursor: 'pointer',
                    color: clickedMenus.includes(menuItem.submenu) ? '#ffffff' : ''
                  }}
                >
                  {menuItem.title}
                </li>
              ))
            }
          </ul>

          {subMenu && subMenu === 'fieldpromotion' ? <></> : <></>}
          {
            subMenu && subMenu === 'reports1099'
              ? <Submenu_1099 />
              : <></>
          }
        </div>
      )
      }
    </>
  )
}

export default AdminToolMainMenu
