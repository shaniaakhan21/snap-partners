import { ArrowDownIcon } from 'components/common/icons'
import { useClickOutsideElement } from 'lib/hooks/useClickOutsideElement'
import { useState, useRef, useEffect } from 'react'

export const Profile = ({ email, name, phone, signOut }) => {
  const userMenuRef = useRef(null)
  const [showMenu, setShowMenu] = useState(false)
  const clickOutsideUserMenu = useClickOutsideElement(userMenuRef)

  const handleShowOptions = () => setShowMenu(prevState => !prevState)

  useEffect(() => {
    if (clickOutsideUserMenu && showMenu) setShowMenu(false)
  }, [clickOutsideUserMenu])

  return (
    <div className='flex justify-start items-center relative select-none'>
      <img
        src='/images/avatarAuth.png'
        className='ml-3'
      />

      <div className='ml-3 hidden sm:block'>
        <span>User name</span> <br />
        <span className='whitespace-nowrap'>Cameron Williamson</span>
      </div>

      <div ref={userMenuRef}>
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
  )
}
