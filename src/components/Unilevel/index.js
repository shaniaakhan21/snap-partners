import React, {useState} from 'react'
import {Card, Grid, Typography, makeStyles, TextField, Button} from '@material-ui/core'

import {useSelector} from "react-redux";
import RecursiveAccordion from './RecursiveAccordion';
import ModalUninivelUser from '../Modals/UnilevelUser';
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
    container: {
        padding: 20
    },
    Btn: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.white,
    }
}))

const Unilevel = () => {
    const [ showModal, setshowModal ] = useState(false)
    const [ username, setUsername ] = useState("")
    const [ searchUsername, setsearchUsername ] = useState("")


    const { userId, phoneNumber } = useSelector((state) => state.user);
    const user = {
        id : userId,
        username : phoneNumber
    }

    const openUser = async (username) => {
        setUsername(username)
        setshowModal(true)
    }

    const classes = useStyles()

    return (
        <>
            <ModalUninivelUser username={username} openUser={openUser} open={showModal} close={setshowModal}/>
            <Card style={{width:"100%"}}>
                <Grid className={classes.container} container>
                    <Grid container  className={classes.title} >
                        <Grid item xs={12} md={4} style={{marginBottom:20}}>
                            <Typography variant="h4" color="primary">Unilevel</Typography>
                        </Grid>
                    </Grid>
                    <Grid container  className={classes.title} >
                        <Grid container item xs={12} md={8} justifyContent={"flex-start"} style={{marginBottom:20}}  >
                            <TextField value={searchUsername} onChange={(e) =>{setsearchUsername(e.target.value)}} size={"small"} variant="outlined" placeholder="Search Username" InputProps={{startAdornment: <SearchIcon fontSize="small"/>}}/>
                            <Button disabled={(searchUsername.length === 0)} onClick={() => {openUser(searchUsername)}} variant="contained" className={classes.Btn}>Search</Button>
                        </Grid>
                    </Grid>
                    <Grid item container>
                        <RecursiveAccordion openUser={openUser} master={true} user={user}/>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}

export default Unilevel
