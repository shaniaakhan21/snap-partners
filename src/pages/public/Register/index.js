import React from 'react'
import {Button, Grid, Snackbar, Typography} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react';
import {useStyles} from './registerStyles'
import {Link, useHistory} from "react-router-dom";
import RegisterForm from "./RegisterForm";

const registerImage = '/svg/Register/register.jpg'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const Login = () => {
    const classes = useStyles()
    const changePass = useSelector(state => state.auth.changePassword)

    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch({type: 'auth/changePass', payload: {changePassword: false}})
    }

    const {isAuth} = useSelector(state => state.auth)
    const history = useHistory()
    useEffect(() => {
        if (isAuth) {
            history.push("/genealogy")
        }
    }, [isAuth])

    return (
        <Grid container direction="row" justifyContent="center" alignItems="stretch"
              className={classes.loginBackground}>
            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={changePass} onClose={handleClose} message="Note archived">
                <Alert onClose={handleClose} severity="success" className={classes.notificationAlert}>
                    Password has been changed. You will receive an email with the details
                </Alert>
            </Snackbar>
            <Grid item md={7} xs={12} className={classes.imageContainer} justifyContent="center" alignItems="stretch"
                   container>
            </Grid>
            <Grid item md={5} xs={12} container>
                <Grid direction="row" justifyContent="space-around" className={classes.formContainer} alignItems="flex-start" container>
                    <Grid direction="column" alignItems="center" container>
                        <Typography variant="h4" className={classes.loginTitle}>
                            Register
                        </Typography>
                        <RegisterForm />
                        <Button className={classes.containerForgotPassword}>
                            <Link to={"/login"} className={classes.linkPassword}>
                                I ALREADY HAVE A PASSWORD
                            </Link>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Login
