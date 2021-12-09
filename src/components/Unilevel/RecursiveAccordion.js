import React, {useEffect, useState} from 'react'
import {
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    CircularProgress,
    Grid,
    Button, makeStyles
} from '@material-ui/core'
import axios from "axios";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    Btn: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.white,
        height:22
    }
}))

const RecursiveAccordion = ({openUser,user, master = false}) => {

    const [levels, setlevels] = useState([]);
    const [volume, setVolume] = useState(0);
    const [volumePending, setvolumePending] = useState(0);
    const [spinner, showSpinner] = useState(false);
    const [loading, setLoading] = useState(true);

    const [limits, setLimits] = useState([]);
    const [showLevels, setshowLevels] = useState([]);
    const [cached, setCached] = useState(undefined);

    const classes = useStyles()

    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get(`/api/unilevel/getAllLevels`, {params :{userId: user.id, includeUsers:master ? 1 : 0}})
                setlevels(response.data.results.levels)
                setvolumePending(response.data.results.volumePending)
                setVolume(response.data.results.volume)
                setLoading(false)
                setCached(response)
            } catch (e) {

            }
        })();
    }, []);

    const getUsers = async (key) =>{
        try {
            const newshowLevels = [...showLevels]
            newshowLevels[key] = true
            setshowLevels(newshowLevels)
            if(levels[key].users.length === 0) {
                showSpinner(true)
                let response = cached
                if(cached === undefined || !master) {
                    response = await axios.get(`/api/unilevel/getAllLevels`, {
                        params: {
                            userId: user.id,
                            includeUsers: 1
                        }
                    })
                }
                const newLevels = [...levels]
                newLevels[key] = response.data.results.levels[key];
                setvolumePending(response.data.results.volumePending)
                setVolume(response.data.results.volume)
                setlevels(newLevels)
                showSpinner(false)
                setCached(response)
            }
        } catch (e) {

        }
    }

    const setLimitsLevels = (level, newlimit) => {
        const newLimits = [...limits]
        newLimits[level] = newlimit
        setLimits(newLimits)
    }

    const mapper = master === true ? levels : (levels.length>0) ? [levels[0]] : []
    return (
       <>
           {
               loading && (
                   <CircularProgress color="primary" size={15} style={{marginLeft: 10}} />
               )
           }
           {
               !loading && levels.length === 0 && (
                   <Accordion style={{width: "100%", border: "1px solid grey"}}>
                       <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                           <Chip style={{marginLeft: 5, marginRight:5}} size="small"  label={`${user.name} [${user.id}]`}  />
                           <Chip style={{marginLeft: 5, marginRight:5}} size="small"  label={`Users : 0`} variant="outlined" />
                           <Button onClick={(e) => {e.stopPropagation(); openUser(user.id)}} className={classes.Btn} color={"primary"}  size={"small"} variant="contained">View user</Button>
                       </AccordionSummary>
                   </Accordion>
               )
           }
           {mapper.map((level, key) =>{
               return (
               <Accordion  style={{width: "100%", border: "1px solid grey"}} key={key}>
                   <AccordionSummary onClick={() => {getUsers(key)}}  expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" id="panel1a-header">
                       {master === true ? (<Typography>Level {level.level}</Typography>) :<Chip style={{marginLeft: 5, marginRight:5}} size="small"  label={`${user.name} [${user.id}]`}  />}
                       <Chip style={{marginLeft: 5, marginRight:5}} size="small"  label={`Users : ${level.usersLength}`} variant="outlined" />
                       {master === false && <Button onClick={(e) => {e.stopPropagation(); openUser(user.id)}} className={classes.Btn} color={"primary"} size={"small"} variant="contained">View user</Button>}
                   </AccordionSummary>
                   <AccordionDetails>
                       {showLevels[key] && (
                       <Grid item container>
                       {
                           spinner && level.users.length === 0 && (
                               <CircularProgress color="primary" size={15} style={{marginLeft: 10}} />
                           )
                       }
                       { level.users.map((user, key) => {
                           if (key >= (limits[level.level] || 5)) {
                               return
                           }
                           return <RecursiveAccordion openUser={openUser} key={key} user={user}/>
                       })}
                       </Grid>
                       )}
                   </AccordionDetails>
                   <Typography style={{marginLeft: 20, marginBottom:10 }}>
                       Currently Showing {(limits[level.level] || 5) > level.usersLength ? level.usersLength : (limits[level.level] || 5)}
                       {level.usersLength > (limits[level.level] || 5) && (
                       <Button style={{marginLeft: 10}} size={"small"} variant={"contained"} color={"primary"} onClick={() => {setLimitsLevels(level.level, (limits[level.level] || 5) + 5)}}>Load 5 more</Button>
                       )}
                   </Typography>

               </Accordion>
           )})}
       </>
    )
}

export default RecursiveAccordion
