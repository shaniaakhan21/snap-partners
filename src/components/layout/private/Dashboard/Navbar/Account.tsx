import AccountDefaultImage from 'components/common/AccountDefaultImage'
import { ArrowDownIcon, ArrowDownDark } from 'components/common/icons'

import { useClickOutsideElement } from 'lib/hooks/useClickOutsideElement'
import { useAuthStore } from 'lib/stores'
import { GTMTrack } from 'lib/utils/gtm'
import { useState, useRef, useEffect } from 'react'
import AdminToolMainMenu from './adminTools/AdminToolMainMenu'
import { userLevelReverseMapping } from './adminTools/searchForms/formOptionData'

export const Account = ({ email, name, phone, photoUrl, signOut, rank, roles, level }) => {
  const userMenuRef = useRef(null)
  const { auth } = useAuthStore()
  const [showMenu, setShowMenu] = useState(false)
  const [adminTools, setAdminTools] = useState<boolean>(false)
  const clickOutsideUserMenu = useClickOutsideElement(userMenuRef)

  const handleShowOptions = () => setShowMenu(prevState => !prevState)
  const mapping = userLevelReverseMapping
  console.log('mapping is', mapping[level])

  const handleClickLogout = () => {
    GTMTrack.logout('navbar')
    signOut()
  }

  useEffect(() => {
    if (clickOutsideUserMenu && showMenu) setShowMenu(false)
  }, [clickOutsideUserMenu])

  const _auth: any = auth

  const link = `https://www.integrouswellness.com/${auth.username}?access_token=${auth.accessToken}`
  const isIntegrous = (_auth.roles.integrousAssociate || _auth.roles.integrousCustomer)

  return (
    <section className='w-auto h-full flex justify-end items-center sm:gap-x-5 ml-auto'>
      {mapping[level] >= 500
        ? <div className='admin-tools-container rounded-2xl border-2 border-[#E74426] px-4 flex flex-row justify-between bg-white items-center shadow-md'>
          <div>
            <span className='text-l font-semibold text-[#E74426] whitespace-nowrap hidden sm:block cursor-pointer py-1'><a onClick={() => { setAdminTools(!adminTools) }} >Admin Tools</a></span>
          </div>
          <ArrowDownIcon classes='cursor-pointer' onClick={() => { setAdminTools(!adminTools) }} />
          {
            adminTools
              ? <AdminToolMainMenu />
              : <></>
          }
        </div>
        : <></>
      }


      <div className='flex justify-start items-center relative select-none flex-row '>
        <div className='relative flex flex-row items-center gap-x-2 cursor-pointer' ref={userMenuRef} onClick={handleShowOptions} >
          {photoUrl
            ? (
              <img
                src={photoUrl}
                className='ml-3 w-10 h-10 rounded-3xl shadow-md'
              />
            )
            : (
              <AccountDefaultImage rank={rank} size={42} />
            )}
          <span className='font-semibold whitespace-nowrap mr-2'>{name}</span>
          <ArrowDownDark classes='cursor-pointer' />

        </div>

        <div
          style={{ boxShadow: '1px 3px 6px #cdcdcda1' }}
          className={` transition-opacity ease-in-out ${showMenu ? 'visible opacity-100' : 'opacity-0 invisible'} login-admin-tool-main-menu-container`
          }
        >
          <ul className='w-full h-full px-2 py-1'>
            <li>
              <button onClick={handleClickLogout} className='w-full h-full hover:bg-gray-100 px-5 py-1 rounded-sm hover:cursor-pointer font-semibold'>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
