import React, {useEffect, useState} from "react";
import {GeneralModal} from "../../index";
import {
    Grid,
    Typography,
    ListItem,
    ListItemIcon,
    ListItemText, Button
} from '@material-ui/core'

import Alert from '@material-ui/lab/Alert';
import RecursiveAccordion from "../../Unilevel/RecursiveAccordion";
import axios from "axios";

import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';

const ModalUninivelUser = ({username, close, open, openUser}) => {

    const [user, setUser] = useState({})
    const [userData, setUserData] = useState(null)
    const [error, setError] = useState("")

    useEffect(async () => {
        if(username.length> 0 && open) {
            try {
                setUser({})
                setUserData(null)
                setError("")
                let response = await axios.get(`/api/unilevel/getAllLevelsByUsername`, {params: {username: username, includeUsers: 1}})
                setUser({username, id: response.data.results.userId})
                let responseData = await axios.get(`/api/unilevel/getUserByUsername`, {params: {username: username}})
                setUserData(responseData.data.results)
            } catch (e) {
                setError(e.response.data.message)
            }
        }
    }, [username]);

    return (
        <GeneralModal onClose={() => {close(false)}} open={open} showClose={true}>
            <Grid item xs={12} style={{marginBottom :15}}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Searching Username: {username}
                </Typography>
            </Grid>
            {userData && (
                <Grid item container style={{marginBottom :15}}>
                    <ListItem>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={`Sponsor: ${userData["sponsor.username"] !== null ? userData["sponsor.username"] : "No Sponsor"}`} />
                        {(userData["sponsor.username"] !== null) && (
                            <Button onClick={(e) => {e.stopPropagation(); openUser(userData["sponsor.username"])}} size={"small"} variant="contained">View Sponsor</Button>
                        )}
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <EmailIcon />
                        </ListItemIcon>
                        <ListItemText primary={userData.email} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <PhoneIcon />
                        </ListItemIcon>
                        <ListItemText primary={userData.phoneNumber} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <AttachMoneyIcon />
                        </ListItemIcon>
                        <ListItemText primary={`Complete Personal Purchases: ${userData.volume} USD`}  />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <MoneyOffIcon />
                        </ListItemIcon>
                        <ListItemText primary={`Pending Personal Purchases: ${userData.volumePending} USD`} />
                    </ListItem>
                </Grid>
            )}
            {user.username && (
                <Grid item container>
                    <RecursiveAccordion master={true} openUser={openUser} user={user}/>
                </Grid>
            )}
            {error.length > 0 && (
                <Alert severity="error">{error}</Alert>
            )}
        </GeneralModal>
    )
}

export default ModalUninivelUser