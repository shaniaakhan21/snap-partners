import React from 'react'
import { Route } from 'react-router-dom'

import { CommonComponents } from '../../components'
import { ComingSoon, Login, Register } from '../../pages/public'

import { PublicHeader } from '../../components'

const PublicRoutesArray = [
    {"path":'/' , component :  <CommonComponents banner><ComingSoon /></CommonComponents>},
    {"path":'/login' , component :  <CommonComponents><Login /></CommonComponents>},
    {"path":'/register' , component :  <CommonComponents><Register /></CommonComponents>},
]

const PublicRoutes = () => {
    const routes = []
    PublicRoutesArray.forEach((route, i) => {
        routes.push(<Route key={i} exact path={route.path} component={() =>  <><PublicHeader/>{route.component}</>} />)
    })
    // for (const route of PublicRoutesArray){
    //     routes.push(<Route exact path={route.path} component={() =>  <><PublicHeader/>{route.component}</>} />)
    // }
    return routes
}

export default PublicRoutes
