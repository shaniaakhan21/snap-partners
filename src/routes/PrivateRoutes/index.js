import React from 'react'
import { Genealogy, Referrals } from '../../pages/private'
import { CommonComponents, PublicHeader, PrivateRoute} from '../../components'


const PrivateRoutesArray = [
  {"path":'/genealogy' , component :<CommonComponents sidebar><Genealogy /></CommonComponents>},
  {"path":'/referrals' , component :<CommonComponents sidebar><Referrals /></CommonComponents>},
]

const PrivateRoutes = () => {
    const routes = []
    PrivateRoutesArray.forEach((route, i) => {
      routes.push(<PrivateRoute key={i} exact path={route.path} component={() =>  <><PublicHeader/>{route.component}</>} />)
    })

    // for (const route of PrivateRoutesArray) {
    //   routes.push(<PrivateRoute exact path={route.path} component={() =>  <><PublicHeader/>{route.component}</>} />)
    // }
    return routes
}
export default PrivateRoutes;
