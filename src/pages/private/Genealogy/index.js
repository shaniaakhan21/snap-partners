import React from 'react'
import {Grid} from '@material-ui/core'
import { Unilevel } from '../../../components'
import { useStyles } from './styles'

const Genealogy = () => {
  const classes = useStyles()
  return (
    <Grid container className={classes.referralsContainer}>
        <Unilevel/>
    </Grid>
  )
}

export default Genealogy
