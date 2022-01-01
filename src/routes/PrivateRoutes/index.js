import React from 'react'
import { Genealogy } from '../../pages/private'
import { CommonComponents, PublicHeader, PrivateRoute} from '../../components'


const PrivateRoutesArray = [
    {"path":'/genealogy' , component :<CommonComponents sidebar><Genealogy /></CommonComponents>},
]

const PrivateRoutes = () => {
    const routes = []
    for (const route of PrivateRoutesArray){
        routes.push(<PrivateRoute exact path={route.path} component={() =>  <><PublicHeader/>{route.component}</>} />)
    }
    return routes
}
export default PrivateRoutes;
