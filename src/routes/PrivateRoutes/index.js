import React from 'react'
import { Referrals } from '../../pages/private'
import { CommonComponents, PublicHeader, PrivateRoute} from '../../components'


const PrivateRoutesArray = [
    {"path":'/referrals' , component :<CommonComponents sidebar><Referrals /></CommonComponents>},
]

const PrivateRoutes = () => {
    const routes = []
    for (const route of PrivateRoutesArray){
        routes.push(<PrivateRoute exact path={route.path} component={() =>  <><PublicHeader/>{route.component}</>} />)
    }
    return routes
}
export default PrivateRoutes;
