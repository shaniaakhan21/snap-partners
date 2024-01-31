import { useEffect, useState } from 'react'
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
import axios from 'axios'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useAuthStore } from 'lib/stores'
import { API } from 'config/api'

const useStyles = makeStyles(theme => ({
  Btn: {
    height: 22,
    color: '#E74426!important',
    border: '1px solid #E74426',
    borderRadius: '10px',
    padding: '10px',
    '&:hover': {
      color: '#FFFFFF!important',
      backgroundColor: '#E74426',
      cursor: 'pointer'
    }
  },
  wrappingViewOptions: {
    '& > div': {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }
}))

export const RecursiveAccordion = ({ openUser, user, master = false }) => {
  const { auth } = useAuthStore()
  const [levels, setlevels] = useState([])
  const [, setVolume] = useState(0)
  const [, setvolumePending] = useState(0)
  const [spinner, showSpinner] = useState(false)
  const [loading, setLoading] = useState(true)

  const [limits, setLimits] = useState([])
  const [showLevels, setshowLevels] = useState([])
  const [cached, setCached] = useState(undefined)

  const classes = useStyles()

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`${API.BASE_URL}/api/unilevel/getAllLevels`, {
          params: { userId: user.id, includeUsers: master ? 1 : 0, limit: 999999999, page: 1 },
          headers: {
            Authorization: `Bearer ${auth.accessToken}`
          }
        })
        setlevels(response.data.data.levels)
        setvolumePending(response.data.data.volumePending)
        setVolume(response.data.data.volume)
        setLoading(false)
        setCached(response)
      } catch (e) {

      }
    })()
  }, [])

  const getUsers = async (key) => {
    try {
      const newshowLevels = [...showLevels]
      newshowLevels[key] = true
      setshowLevels(newshowLevels)
      if (levels[key].users.length === 0) {
        showSpinner(true)
        let response = cached
        if (cached === undefined || !master) {
          response = await axios.get(`${API.BASE_URL}/api/unilevel/getAllLevels`, {
            params: { userId: user.id, includeUsers: master ? 1 : 0, limit: 999999999, page: 1 },
            headers: {
              Authorization: `Bearer ${auth.accessToken}`
            }
          })
        }
        const newLevels = [...levels]
        newLevels[key] = response.data.data.levels[key]
        setvolumePending(response.data.data.volumePending)
        setVolume(response.data.data.volume)
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

  const mapper = master === true ? levels : (levels.length > 0) ? [levels[0]] : []
  return (
    <>
      {
        loading && (
          <CircularProgress color="primary" size={15} style={{ marginLeft: 10 }} />
        )
      }
      {
        !loading && levels.length === 0 && (
          <Accordion style={{ width: '100%', border: '1px solid #CFDFEC', backgroundColor: '#F5F9FD', margin: '10px 0', boxShadow: 'none', borderRadius: '8px' }}>
            <AccordionSummary className={classes.wrappingViewOptions} aria-controls="panel1a-content" id="panel1a-header">
              <Chip style={{ marginLeft: 5, marginRight: 5, marginTop: 4, marginBottom: 4 }} className='bg-[#E8F2FA] py-4 px-2' size="small" label={`${user.name} [${user.id}]`} />
              <Chip style={{ marginLeft: 5, marginRight: 5, marginTop: 4, marginBottom: 4 }} size="small" label={'Users : 0'} className='bg-[#F5F9FD] text-base font-bold text-[#7194AF]' />
              <Button style={{ marginLeft: 5, marginRight: 5, marginTop: 4, marginBottom: 4 }} onClick={(e) => { e.stopPropagation(); openUser(user.id, user.name) }} className={classes.Btn} color={'primary'} size={'small'} variant="contained">View user</Button>
            </AccordionSummary>
          </Accordion>
        )
      }
      {mapper.map((level, key) => {
        return (
          <Accordion style={{ width: '100%', border: '1px solid #CFDFEC', backgroundColor: '#F5F9FD', margin: '10px 0', boxShadow: 'none', borderRadius: '8px' }} key={key}>
            <AccordionSummary style={{ display: 'flex', flexWrap: 'wrap' }} onClick={() => { getUsers(key) }} expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" id="panel1a-header">
              {master === true ? (<Typography style={{ marginLeft: 5, marginRight: 5, marginTop: 4, marginBottom: 4 }}>Level {level.level}</Typography>) : <Chip style={{ marginLeft: 5, marginRight: 5, marginTop: 4, marginBottom: 4 }} size="small" className='bg-[#E8F2FA] py-4 px-2' label={`${user.name} [${user.id}]`} />}
              <Chip style={{ marginLeft: 5, marginRight: 5, marginTop: 4, marginBottom: 4 }} size="small" label={`Users : ${level.usersLength}`} className='bg-[#F5F9FD] text-base font-bold text-[#7194AF]' />
              {master === false && <Button onClick={(e) => { e.stopPropagation(); openUser(user.id, user.name) }} className={classes.Btn} size={'small'} variant="contained" style={{ marginLeft: 5, marginRight: 5, marginTop: 4, marginBottom: 4 }}>View user</Button>}
            </AccordionSummary>
            <AccordionDetails>
              {showLevels[key] && (
                <Grid item container>
                  {
                    spinner && level.users.length === 0 && (
                      <CircularProgress color="primary" size={15} style={{ marginLeft: 10 }} />
                    )
                  }
                  { level.users.map((user, key) => {
                    if (key >= (limits[level.level] || 5)) {
                      // eslint-disable-next-line array-callback-return
                      return
                    }
                    return <RecursiveAccordion openUser={openUser} key={key} user={user}/>
                  })}
                </Grid>
              )}
            </AccordionDetails>
            <Typography style={{ marginLeft: 20, marginBottom: 10 }}>
                       Currently Showing {(limits[level.level] || 5) > level.usersLength ? level.usersLength : (limits[level.level] || 5)}
              {level.usersLength > (limits[level.level] || 5) && (
                <Button style={{ marginLeft: 10 }} size={'small'} variant={'contained'} className={classes.Btn} onClick={() => { setLimitsLevels(level.level, (limits[level.level] || 5) + 5) }}>Load 5 more</Button>
              )}
            </Typography>

          </Accordion>
        )
      })}
    </>
  )
}
