/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import NextSnapTile from './EventTile'
import { events } from './mock'
import axios from 'axios'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

interface IEvent {
  img: string,
  title: string,
  description: string,
  redirectUrl: string
}

function Event () {
  const [eventData, setEvent] = React.useState<Array<IEvent>>([])

  const getEventData = async () => {
    await axios.get('/api/event')
      .then((response) => {
        if (response.data.status) {
          let convertedData = response.data.result.map((eventBanner) => (
            {
              img: getImgUrl(eventBanner.fileData, eventBanner.fileType),
              title: `${eventBanner.title}`,
              description: extractDate(new Date(eventBanner.fromDate), new Date(eventBanner.toDate)),
              redirectUrl: `${eventBanner.redirectUrl}`
            }
          ))
          setEvent(convertedData)
        }
      })
      .catch((e) => {
        return ''
      })
  }

  const getImgUrl = (fileData, fileType) => {
    const buffer = Buffer.from(fileData)
    const data = new Blob([buffer], { type: `${fileType}` })
    return URL.createObjectURL(data)
  }

  const extractDate = (fromDate:Date, toDate:Date) => {
    const description = `${fromDate.getDate()}/${fromDate.getMonth()}/${fromDate.getFullYear()} to ${toDate.getDate()}/${toDate.getMonth()}/${toDate.getFullYear()}`
    return description
  }

  React.useEffect(() => {
    getEventData()
  }, [])
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = eventData?.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step: number) => {
    setActiveStep(step)
  }

  return (
    <Box sx={{ maxWidth: '100%', flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default'
        }}
      >
        <Typography
          sx={{
            fontSize: '20px'
          }}
        >Next Snap Events</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {eventData && eventData.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2
              ? (
                <NextSnapTile
                  redirectUrl={step.redirectUrl}
                  title={step.title}
                  description={step.description}
                  image={step.img}/>
              )
              : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === 'rtl'
              ? (
                <ArrowForwardIcon className="text-black" />
              )
              : (
                <ArrowForwardIcon className="text-black" />
              )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl'
              ? (
                <ArrowBackIcon className="text-black" />
              )
              : (
                <ArrowBackIcon className="text-black" />
              )}
          </Button>
        }
      />
    </Box>
  )
}

export default Event
