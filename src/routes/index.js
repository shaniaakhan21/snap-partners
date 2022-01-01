import React from 'react'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'
import { Switch, Route } from 'react-router-dom'
import { ComingSoon } from '../pages/public'
import {CommonComponents, PublicHeader} from '../components'
import ScrollToTop from '../hooks/ScrollToTop'

// eslint-disable-next-line react/prop-types
const Routes = () => {
  return (
      <>
          <ScrollToTop/>
          <Switch>
              {
                  PrivateRoutes().map(route => route)
              }
              {
                  PublicRoutes().map(route => route)
              }
              <Route component={() => <><PublicHeader/><CommonComponents><ComingSoon/></CommonComponents></>}/>
          </Switch>
      </>
  )
}
export default Routes
