/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import NextSnapTile from './EventTile'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
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
    <Box sx={{ maxWidth: '100%', flexGrow: 1 }} className='bg-white rounded-3xl shadow-lg pt-1'>
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
        className='rounded-b-3xl'
        sx={{
          backgroundColor: '#F0F4F8'
        }}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="medium"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            sx={{
              borderRadius: '50px',
              borderColor: 'grey'
            }}
            className='cursor-pointer'
          >
            {theme.direction === 'rtl'
              ? (
                <ArrowForwardIosIcon className="text-black-h rounded-full bg-white shadow-lg p-[3px] cursor-pointer" />
              )
              : (
                <ArrowForwardIosIcon className="text-black-h rounded-full bg-white shadow-lg p-[3px] cursor-pointer" />
              )}
          </Button>
        }
        backButton={
          <Button size="medium" onClick={handleBack} disabled={activeStep === 0} className='cursor-pointer' sx={{
            borderRadius: '50px',
            borderColor: 'grey'
          }}>
            {theme.direction === 'rtl'
              ? (
                <ArrowBackIosIcon className="text-black-h rounded-full bg-white shadow-lg p-[3px] cursor-pointer" />
              )
              : (
                <ArrowBackIosIcon className="text-black-h rounded-full bg-white shadow-lg p-[3px] cursor-pointer" />
              )}
          </Button>
        }
      />
    </Box>
  )
}

export default Event
