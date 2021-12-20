import React from 'react'
import { useSelector } from 'react-redux'
import { Navbar, ConferenceBanner, Sidebar, Footer } from '../index'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const CommonComponents = ({ children, topNav = true, sidebar = false, footer = true }) => {
  const { isAuth } = useSelector(state => state.auth)

  return (
    <>
    <Helmet>
      <link rel='icon' href='/svg/favicon.svg' type='image/x-icon' />
    </Helmet>
    <div>
      { topNav && <Navbar /> }
      <div style={{ display: 'flex' }}>
        {
          (isAuth && sidebar) &&
            <Sidebar />
        }
        <div style={{ width: '100%' }}>
          <div style={{ width: '100%' }}>
            {
              children
            }
          </div>
        </div>
      </div>
    </div>
    { Footer && <Footer /> }
    </>
  )
}

CommonComponents.propTypes = {
  children: PropTypes.any,
  topNav: PropTypes.bool,
  botNav: PropTypes.bool,
  banner: PropTypes.bool,
  conferenceBanner: PropTypes.bool,
  sidebar: PropTypes.bool,
  footer: PropTypes.bool
}

export default CommonComponents
