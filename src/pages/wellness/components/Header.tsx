import { useState } from 'react'
import { Link, Menu, MenuItem, IconButton, IconButtonProps } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  logoLink?: string;
  profilePic?: string;
  profileName?: string;
  onLogout?: () => void;
}

const Header = ({
  logoSrc = '/static/wellness/wellness_logo.svg',
  logoAlt = 'Wellness Logo',
  logoLink = '/wellness',
  profilePic = '/static/wellness/dp.png',
  profileName = 'Jason White',
  onLogout = () => {}
}: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick: IconButtonProps['onClick'] = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleClose()
    onLogout()
  }

  return (
    <header className="bgc-black text-white flex flex-row items-center w-full px-5 md:px-10 lg:px-20">
      <div className="justify-between items-center w-9/12 lg:w-11/12 py-2">
        <Link href={logoLink} className="text-2xl font-bold">
          <img src={logoSrc} alt={logoAlt} />
        </Link>
      </div>
      <div className="w-8/12 md:w-2/12">
        <div className="flex flex-row justify-end w-11/12 items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={profilePic}
              alt="Profile Picture"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <IconButton color="inherit" onClick={handleClick}>
              <span className="text-sm pr-1">{profileName}</span>
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
        </div>
      </div>
    </header>
  )
}

export default Header
