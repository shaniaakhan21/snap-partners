import React, { useState } from 'react'
import { Link as RouterLink, NavLink, useParams } from 'react-router-dom'
import { Hidden, Grid, Link, List, ListItem, Icon, Button, Typography, Box } from '@material-ui/core'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import {useSelector} from "react-redux";

import SideNav from '../../SideNav';

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  navbarIcons: {
    marginRight: '3%'
  },
  root: {
    display: 'flex',
    backgroundColor: theme.palette.primary.light
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0

    }
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth

    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: '50vw',
  },
  content: {
    flexGrow: 1,

    padding: theme.spacing(3)
  },
  navbarBackground: {
    backgroundColor: theme.palette.primary.main,
    padding: 15
  },
  navbarText: {
    color: theme.palette.text.white,
    textTransform: 'uppercase',
    fontWeight: 500,
    paddingRight: 30
  },
  NavbarLinks: {
    textDecoration: 'none',
    display: 'flex'
  },
  NavbarItem: {
    width: '60vw',
    color: 'black',
    textDecoration: 'none'
  },
  whiteIcon:{
    color: "white"
  }
}))

const Navbar = (props) => {
  const isAuth = useSelector(state => state.auth.isAuth)
  const { window } = props

  const classes = useStyles()
  const theme = useTheme()

  const navLinks = [/*
    {
      icon: <StoreIcon color="primary" />,
      name: "Buy",
      link: `/buy`
    }
 */ ]

  if(isAuth){
    SideNav().map((e) => {navLinks.push(e)})
  }

  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
      <div className={classes.toolbar} >
      <Divider />
      <List>
        {navLinks.map((item, index) =>{

          if(item.hideside === true){
            return (<></>);
          }

          if(item.type === "button") {
            return (
                <ListItem button key={index}>
                  <Button component={RouterLink} to={item.link}  className={classes.NavbarLinks} style={{backgroundColor: "#01304E", color: "white", textTransform: "none"}}>
                    {item.icon}
                    <ListItemText primary={item.name} style={{color: "white", marginLeft:5, marginRight: 5}} />
                  </Button>
                </ListItem>
            )
          }

          return (
              <ListItem button key={index}>
                {item.url &&
                <a href={item.url} target={"_blank"} className={classes.NavbarLinks}>
                  <Icon className={classes.navbarIcons}>
                    {item.icon}
                  </Icon>
                  <ListItemText primary={item.name} className={classes.NavbarItem}/>
                </a>
                }
                {!item.url &&
                <RouterLink to={item.link} className={classes.NavbarLinks} >
                  <Icon className={classes.navbarIcons}>
                    {item.icon}
                  </Icon>
                  <ListItemText primary={item.name} className={classes.NavbarItem}/>
                </RouterLink>
                }
              </ListItem>
          )}
        )}
      </List>
      <Divider />
    </div>
  )

  const container = window !== undefined ? () => window.document.body : undefined

  return (
    <>
      <Hidden smDown>
        <Grid
          direction="row"
          justifyContent="center"
          alignItems="center"
          className={ classes.navbarBackground }
          container
        >
          {
            navLinks.map(e => {

              if(!e.side) {

                if (e.type === "button") {return (
                  <Button component={RouterLink} to={e.link} style={{backgroundColor: "white", color: "#01304E", marginTop: 0, marginBottom: 0}}>
                    {e.name}
                  </Button>
                  )}

                if (e.url) {
                  return <Link key={e.name} href={e.url} target="_blank" className={classes.navbarText}>
                    {e.name}
                  </Link>
                }

                if (!e.url) {
                  return <Link key={e.name} className={classes.navbarText} component={RouterLink} to={e.link}>
                    {e.name}
                  </Link>
                }
              }

            }
            )
          }
        </Grid>
      </Hidden>

      <Hidden mdUp>
          <div className={classes.root}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <nav className={classes.drawer} aria-label="mailbox folders">
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Hidden smUp implementation="css">
                <Drawer
                  container={container}
                  variant="temporary"
                  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper
                  }}
                  ModalProps={{
                    keepMounted: true // Better open performance on mobile.
                  }}
                >
                  {drawer}
                </Drawer>
              </Hidden>
            </nav>
          </div>
      </Hidden>
      
    </>
  )
}

Navbar.propTypes = {
  window: PropTypes.func
}

export default Navbar
