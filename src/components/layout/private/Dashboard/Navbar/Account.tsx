import AccountDefaultImage from 'components/common/AccountDefaultImage'
import { ArrowDownIcon } from 'components/common/icons'
import { useClickOutsideElement } from 'lib/hooks/useClickOutsideElement'
import { useAuthStore } from 'lib/stores'
import { GTMTrack } from 'lib/utils/gtm'
import { useState, useRef, useEffect } from 'react'
import AdminToolMainMenu from './adminTools/AdminToolMainMenu'

export const Account = ({ email, name, phone, photoUrl, signOut, rank, roles }) => {
  const userMenuRef = useRef(null)
  const { auth } = useAuthStore()
  const [showMenu, setShowMenu] = useState(false)
  const [adminTools, setAdminTools] = useState<boolean>(false)
  const clickOutsideUserMenu = useClickOutsideElement(userMenuRef)

  const handleShowOptions = () => setShowMenu(prevState => !prevState)

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
    <section className='w-full h-full flex justify-end items-center gap-x-5'>
      {roles.admin
        ? <div className='admin-tools-container'>
          <div>
            <span className='text-l font-bold text-gray-700 whitespace-nowrap'>Admin Tools</span>
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
      <div className='relative'>
        {/* <NotificationIcon classes='w-6 h-6' />

        <div className='absolute -top-2 -right-4 h-5 w-5 bg-[#FF4343] rounded-full text-white text-sm font-semibold flex justify-center items-center'>
          <span>3</span>
        </div> */}
        {isIntegrous && (
          <a href={link} style={{ cursor: 'pointer', marginLeft: 10, width: 150, padding: 6, paddingLeft: 10, color: 'white' }} className="rounded-full bg-primary-500 bg-red-500 ">
            <i className="fa-solid fa-cart-shopping"></i>
            <span className='text-xs text-white font-medium p-2 uppercase'>Shopping Cart</span>
          </a>
        )}
      </div>

      <div className='flex justify-start items-center relative select-none'>
        <div className='relative'>
          {photoUrl
            ? (
              <img
                src={photoUrl}
                className='ml-3 w-10 h-10 rounded-3xl'
              />
            )
            : (
              <AccountDefaultImage rank={rank} size={40} />
            )}

          {/* <div className='sm:hidden absolute -top-1 -right-2 h-3.5 w-3.5 bg-[#FF4343] rounded-full text-white flex justify-center items-center' /> */}
        </div>

        {/* <div className='ml-3 hidden sm:block leading-3'> */}
        {/* <span className='text-sm'>User name</span> <br /> */}
        {/* <span className='whitespace-nowrap font-medium text-gray-700'>Cameron Williamson</span> */}
        {/* </div> */}

        <div className='hidden sm:block' ref={userMenuRef}>
          <ArrowDownIcon classes='cursor-pointer' onClick={handleShowOptions} />
        </div>

        <div
          style={{ boxShadow: '1px 3px 6px #cdcdcda1' }}
          className={
            `absolute -bottom-10 right-0 bg-white rounded-md border border-solid border-gray-200 transition-opacity ease-in-out ${showMenu ? 'visible opacity-100' : 'opacity-0 invisible'}`
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
