import React from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useStyles } from './styles'
import { Link as RouterLink } from 'react-router-dom'

const ComingSoon = () => {

  const classes = useStyles()
  return (
        <Grid container justifyContent='center' className={classes.generalContainer}>
            <Grid container direction='column' alignItems='center'>
                <Typography variant='h6' color='secondary' className={classes.title}>Coming Soon</Typography>
                <Button to={"/login"} component={RouterLink} variant='contained' color='primary'><ArrowBackIcon />Go Home</Button>
            </Grid>

            <Grid container justifyContent='center'>
                <img src='/svg/Login/login.svg' className={classes.imageContainer} />
            </Grid>
        </Grid>
  )
}

export default ComingSoon
