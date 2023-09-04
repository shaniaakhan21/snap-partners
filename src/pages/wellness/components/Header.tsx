import { useState, useEffect } from 'react'
import { Link, Menu, MenuItem, IconButton, IconButtonProps } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Router from 'next/router'

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
  profilePic = '/static/wellness/dp.png',
  profileName = 'Jason White',
  onLogout = () => {},
  isLoggedIn,
  setIsLoggedIn
}: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [userData,setUserData] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick: IconButtonProps['onClick'] = (event) => {
    setAnchorEl(event.currentTarget)
  }

 useEffect(() => {
  if(isLoggedIn)
  {
    setUserData(JSON.parse(localStorage.getItem('userData')))
  }
 },[isLoggedIn])  

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("userName")
    localStorage.removeItem("userData")
    setIsLoggedIn(false)
    Router.push('/wellness')
  }

  return (
    <header className="bgc-black text-white flex flex-row items-center w-full px-20">
      <div className="justify-between items-center w-11/12 py-2">
        <Link href={logoLink} className="text-2xl font-bold">
          <img src={logoSrc} alt={logoAlt} />
        </Link>
      </div>
      <div className="w-2/12">
        { isLoggedIn ?
        <div className="flex flex-row justify-end w-11/12 items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={userData ? userData?.profileImage : ''}
              alt="Profile Picture"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <IconButton color="inherit" onClick={handleClick}>
              <span className="text-sm pr-1">{userData? `${userData?.name} ${userData?.lastname}`:''}</span>
              <ArrowDropDownIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </div> :
        <div>SignUp</div>
        }
      </div>
    </header>
  )
}

export default Header
