// Submenu_1099
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from 'lib/stores'
import ReportsSubMenu from './1099ReportsSubMenu'
import ResolutionSubMenu from './1099ResolutionSubMenu'

function Submenu_1099 () {
  const [subMenu, setSubMenu] = useState('none')
  const [menuOpen, setMenuOpen] = useState(true)
  const [clickedMenus, setClickedMenu] = useState([])
  const auth = useAuthStore()
  const menuData = [
    {
      icon: '',
      title: 'Resolution',
      submenu: 'resolutions1099'
    },
    {
      icon: '',
      title: 'Reports',
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
            {menuData.map((menuItem, index) => (
              <li
                key={index}
                className={`item-${index} menuItem rounded-3xl text-sm sm:text-base ${
                  subMenu === menuItem.submenu ? 'active' : ''
                }`}
                onClick={() => handleMenuClick(menuItem)}
                style={{
                  backgroundColor: clickedMenus.includes(menuItem.submenu) ? '#E74426' : '',
                  cursor: 'pointer',
                  color: clickedMenus.includes(menuItem.submenu) ? '#ffffff' : ''
                }}
              >
                {menuItem.title}
              </li>
            ))}
          </ul>
          <ReportsSubMenu isVisible={subMenu === 'reports1099'} />
          <ResolutionSubMenu isVisible={subMenu === 'resolutions1099'} />
        </div>
      )}
    </>
  )
}

export default Submenu_1099
