import { useState } from 'react'
import { Link, Menu, MenuItem, IconButton } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <header className="bgc-black text-white flex flex-row items-center w-full px-20">
      <div className="justify-between items-center w-11/12 py-2">
        <Link href="/wellness" className="text-2xl font-bold">
          <img src="/static/wellness/wellness_logo.svg" alt="Wellness Logo" />
        </Link>
      </div>
      <div className="w-2/12">
        <div className="flex flex-row justify-end w-11/12 items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src="/static/wellness/dp.png"
              alt="Profile Picture"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <IconButton color="inherit" onClick={handleClick}>
              <span className="text-sm pr-1">Jason White</span>
              <ArrowDropDownIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
