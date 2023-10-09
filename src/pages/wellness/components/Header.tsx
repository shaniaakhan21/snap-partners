import { useState, useEffect } from 'react'
import { Link, Menu, MenuItem, IconButton, IconButtonProps } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Router from 'next/router'
import { Button } from 'components/common/Button'
import { useAuthStore } from 'lib/stores'

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  logoLink?: string;
  profilePic?: string;
  profileName?: string;
  isLoggedIn?: boolean;
  userData?: any;
  bgcblack?:string;
  btnBG?:string;
  onLogout?: () => void;
}

const Header = ({
  logoSrc = '/static/wellness/wellness_logo.svg',
  logoAlt = 'Wellness Logo',
  profilePic = '/static/wellness/pp-placeholder.png',
  profileName = 'Jason White',
  onLogout = () => {},
  isLoggedIn,
  userData,
  bgcblack,
  btnBG
}: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { removeAuth } = useAuthStore()
  const open = Boolean(anchorEl)
  const handleClick: IconButtonProps['onClick'] = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    removeAuth()
    window.location.reload()
  }

  const handleGuestLogout = () => {
    localStorage.setItem('isGuest', 'false')
    window.location.reload()
  }

  const handleLogin = (isGuest: boolean = false) => {
    const referralCodeFromLocalStorage = localStorage.getItem('referralCode')
    const queryParams = new URLSearchParams(window.location.search)
    const referralCodeFromQuery = queryParams.get('referralCode')
    const referralCode = referralCodeFromLocalStorage || referralCodeFromQuery || 'NoSponsor'
    let loginRoute = '/auth/login-wellness?referralCode=' + referralCode

    if (window.location.pathname.includes('integrousWellness')) {
      loginRoute += '&redirectToIntegrousWellness=true'
    } else if (window.location.pathname.includes('WeightCare')) {
      loginRoute += '&redirectToWeightCare=true'
    }

    Router.push(loginRoute)

    if (isGuest) {
      localStorage.setItem('isGuest', 'true')
    } else {
      localStorage.setItem('isGuest', 'false')
    }
  }

  const isGuest = typeof localStorage !== 'undefined' && localStorage.getItem('isGuest') === 'true'
  const isWeightCarePage = typeof window !== 'undefined' && window.location.pathname.includes('WeightCare')
  return (
    <header className={`${bgcblack} text-white flex flex-row items-center w-[100%] px-5 md:px-10 lg:px-20 2xl:px-24 3xl:px-48`}>
      <div className="justify-between items-center w-[30%] lg:w-9/12 py-2">
        <Link className="text-2xl font-bold">
          <img src={logoSrc} alt={logoAlt} className='3xl:w-36'/>
        </Link>
      </div>

      { isLoggedIn
        ? (
          <div className="w-[70%] lg:w-3/12">
            <div className="flex flex-row justify-end w-11/12 items-center">
              <div className="overflow-hidden pr-1 hidden xl:block">
                <i className="fa fa-user text-white text-center text-2xl" aria-hidden="true"></i>
              </div>
              <div>
                <IconButton color="inherit" onClick={handleClick}>
                  <span className="text-xs lg:text-base pr-1 3xl:text-2xl capitalize">{userData ? `${userData?.name} ${userData?.lastname}` : ''}</span>
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
          </div>
        )
        : (
          <div className={`w-[70%] lg:w-3/12 ${isGuest ? 'w-[70%] lg:w-2/12' : ''}`}>
            {isGuest
              ? (
                <div>
                  <div className="flex flex-row justify-end w-11/12 items-center">
                    <div className="overflow-hidden pr-1 hidden xl:block">
                      <i className="fa fa-user text-white text-center text-2xl" aria-hidden="true"></i>
                    </div>
                    <div>
                      <IconButton color="inherit" onClick={handleClick}>
                        <span className="text-xs lg:text-base pr-1 3xl:text-2xl capitalize">I'm a Guest</span>
                        <ArrowDropDownIcon />
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleGuestLogout} className='3xl:text-2xl 3xl:px-9 py-0 text-sm'>Logout</MenuItem>
                      </Menu>
                    </div>
                  </div>
                </div>
              )
              : (
                <div>
                  <div className='flex items-center justify-end'>
                    <Button onClick={() => { handleLogin() }}
                      classes={`text-xs md:text-base 2xl:text-base 3xl:text-2xl font-bold bg-${btnBG} rounded-lg px-2 lg:px-5 3xl:px-7 mr-4`}
                    >
                    LOG IN
                    </Button>
                    {!isWeightCarePage && (
                      <>
                        <p className='text-xs md:text-base 2xl:text-base 3xl:text-2xl font-bold mr-4'>OR</p><Button onClick={() => {
                          localStorage.setItem('isGuest', 'true')
                          window.location.reload()
                        } }
                        classes={`text-xs md:text-base 2xl:text-base 3xl:text-2xl font-bold bg-${btnBG} rounded-lg px-2 lg:px-5 3xl:px-7`}
                        >
                        Continue As a guest
                        </Button></>
                    )}
                  </div>
                </div>
              )}
          </div>
        )}
    </header>
  )
}

export default Header
