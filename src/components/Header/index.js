import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { BtnDropdown } from '..'
import { useStyles } from './styles'
import useWindowSize from '../../hooks/useWindowSize'
const logo = '/svg/logo.svg'
const logoMobile = '/svg/logoMobile.svg'

const PublicHeader = () => {

  const classes = useStyles()
  const dispatch = useDispatch()

  const size = useWindowSize()

  const items = [
    {
      text: "Logout",
      link: '/login',
      action: () => {
        localStorage.removeItem('token')
        dispatch({
          type: 'auth/authenticate',
          payload: {
            isAuth: false
          }
        })
      }
    }
  ]

  const isLogged = useSelector(state => state.auth.isAuth)

  return (
    <Grid direction="row" justifyContent="center" alignItems="center" className={classes.root} container>
      <Grid alignItems="center" className={classes.inter} container>
        <Grid item xs={6} sm={6}>
          <Grid direction="row" alignItems="center" container>
            <Link to={"/login"}>
              <img src={size.width > 620 ? logo : logoMobile} alt="SNAP" className={classes.logo} />
            </Link>
          </Grid>
        </Grid>

        <Grid item xs={6} sm={6} container justifyContent='flex-end'>
          {
            !isLogged &&
                <>
                  <Link to={"/login"} style={{ textDecoration: 'none', color: '#fff' }}>
                    <Button className={`${classes.buttons} ${classes.buttonLogin}`} size={size.width < 620 ? 'small' : 'large'}>
                      LOGIN
                    </Button>
                  </Link>

                  <Link to={"/register"} style={{ textDecoration: 'none', color: '#fff' }}>
                    <Button className={`${classes.buttonRegister} ${classes.buttons}`} color="primary" variant="contained" size={size.width < 620 ? 'small' : 'large'}>
                      REGISTER
                    </Button>
                  </Link>

                </>
          }
          {
            isLogged &&
            <BtnDropdown items={items} />
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PublicHeader
