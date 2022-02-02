import { ArrowDownIcon, NotificationIcon } from 'components/common/icons'
import { useClickOutsideElement } from 'lib/hooks/useClickOutsideElement'
import { useState, useRef, useEffect } from 'react'

export const Account = ({ email, name, phone, signOut }) => {
  const userMenuRef = useRef(null)
  const [showMenu, setShowMenu] = useState(false)
  const clickOutsideUserMenu = useClickOutsideElement(userMenuRef)

  const handleShowOptions = () => setShowMenu(prevState => !prevState)

  useEffect(() => {
    if (clickOutsideUserMenu && showMenu) setShowMenu(false)
  }, [clickOutsideUserMenu])

  return (
    <section className='w-full h-full flex justify-end items-center gap-x-5'>
      <div className='relative hidden sm:block'>
        <NotificationIcon classes='w-6 h-6' />

        <div className='absolute -top-2 -right-4 h-5 w-5 bg-[#FF4343] rounded-full text-white text-sm font-semibold flex justify-center items-center'>
          <span>3</span>
        </div>
      </div>

      <div className='flex justify-start items-center relative select-none'>
        <div className='relative'>
          <img
            src='/images/avatarAuth.png'
            className='ml-3'
          />

          <div className='sm:hidden absolute -top-1 -right-2 h-3.5 w-3.5 bg-[#FF4343] rounded-full text-white flex justify-center items-center' />
        </div>

        <div className='ml-3 hidden sm:block leading-3'>
          {/* <span className='text-sm'>User name</span> <br /> */}
          {/* <span className='whitespace-nowrap font-medium text-gray-700'>Cameron Williamson</span> */}
        </div>

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
              <button className='w-full h-full hover:bg-gray-100 px-5 py-1 rounded-sm hover:cursor-pointer font-semibold'>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
