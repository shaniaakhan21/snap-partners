import React from 'react'
import {useStyles} from './styles'
import {Typography} from '@material-ui/core'
import SideNav from '../SideNav';
import { Link } from 'react-router-dom'


const Sidebar = () => {
    const classes = useStyles()
    return (
        <>
            <ul className={classes.sidebarContainer}>
                {
                    SideNav().map(item => {
                        return (
                            <li key={item.name} className={classes.sidebarItem}>
                                <Link className={classes.sidebarLink} to={item.link}>
                                    {item.icon}
                                    <Typography variant="body1" style={{marginLeft: 10}}>{item.name}</Typography>
                                </Link>
                            </li>
                        )
                    })
                }

            </ul>
        </>
    )
}

export default Sidebar
