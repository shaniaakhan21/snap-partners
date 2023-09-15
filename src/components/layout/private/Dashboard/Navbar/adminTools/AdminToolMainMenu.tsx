/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import AdvanceSearchSubMenu from './AdvanceSearchSubMenu'
import AccountingReportsSubMenu from './AccountingReportsSubMenu'

function AdminToolMainMenu () {
  const [subMenu, setSubMenu] = useState('none')
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
  return (
    <div className='admin-tool-main-menu-container'>
      <ul>
        {
          menuData.map((menuItem, index) => (
            <li className={`item-${index} menuItem text-sm sm:text-base`} onClick={() => {
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

export default AdminToolMainMenu
