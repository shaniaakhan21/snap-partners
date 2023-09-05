import { useState, useEffect } from 'react'
import { Link, Menu, MenuItem, IconButton, IconButtonProps } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Router from 'next/router'
import { Button } from 'components/common/Button';

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  logoLink?: string;
  profilePic?: string;
  profileName?: string;
  isLoggedIn?: boolean;
  setIsLoggedIn?: any
  onLogout?: () => void;
}

const Header = ({
  logoSrc = '/static/wellness/wellness_logo.svg',
  logoAlt = 'Wellness Logo',
  logoLink = '/wellness',
  profilePic = '/static/wellness/pp-placeholder.png',
  profileName = 'Jason White',
  onLogout = () => {},
  isLoggedIn,
  setIsLoggedIn
}: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [userData, setUserData] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick: IconButtonProps['onClick'] = (event) => {
    setAnchorEl(event.currentTarget)
  }

  useEffect(() => {
    if (isLoggedIn) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [isLoggedIn])

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('userName')
    localStorage.removeItem('userData')
    setIsLoggedIn(false)
    Router.push('/wellness')
  }

  const handleLogin = () => {
    const referralCode = localStorage.getItem('referralCode') || 'NoSponsor'
    Router.push(`/auth/login-wellness?redirectToWellness=true&referralCode=${referralCode}`)
  }

  return (
    <header className="bgc-black text-white flex flex-row items-center w-full px-5 md:px-10 lg:px-20 2xl:px-48">
      <div className="justify-between items-center w-9/12 lg:w-11/12 py-2">
        <Link href={logoLink} className="text-2xl font-bold">
          <img src={logoSrc} alt={logoAlt} className='3xl:w-36'/>
        </Link>
      </div>
      <div className="w-4/12 lg:w-2/12">
        { isLoggedIn
          ? <div className="flex flex-row justify-end w-11/12 items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={userData ? userData?.profileImage : '/static/wellness/pp-placeholder.png'}
                alt="Profile Picture"
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <IconButton color="inherit" onClick={handleClick}>
                <span className="text-base pr-1 3xl:text-2xl capitalize">{userData ? `${userData?.name} ${userData?.lastname}` : ''}</span>
                <ArrowDropDownIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout} className='3xl:text-2xl 3xl:px-9 py-0 text-sm'>Logout</MenuItem>
              </Menu>
            </div>
          </div>
          : <div className='text-right'>
            <Button onClick={() => { handleLogin() }}
              classes='text-xs md:text-base 2xl:text-base 3xl:text-2xl font-bold bg-btn-color rounded-lg px-2 lg:px-5 3xl:px-7'
            >
              LOG IN
            </Button>
          </div>
        }
      </div>
    </header>
  )
}

export default Header
