// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import SwipeableViews from 'react-swipeable-views'
import CertificationTile from './CertificationTile'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import axios from 'axios'

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

interface ICertification {
  title: string;
  description: string;
  imageURL: string;
  redirectUrl: string
}

function Certification () {
  const getEventData = async () => {
    await axios.get('/api/certificate')
      .then((response) => {
        console.log('certification data', response)
        if (response.data.status) {
          const convertedData : ICertification[] = response.data.result.map((eventBanner) => (
            {
              imageURL: getImgUrl(eventBanner.fileData, eventBanner.fileType),
              title: `${eventBanner.title}`,
              description: `${eventBanner.description}`,
              redirectUrl: `${eventBanner.redirectUrl}`
            }
          ))
          setCertificationData(convertedData)
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
  const [certifications, setCertificationData] = React.useState<Array<ICertification>>([])
  React.useEffect(() => {
    getEventData()
  }, [])

  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = certifications.length

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
    <Box sx={{ maxWidth: '100%', flexGrow: 1 }} className="bg-white rounded-3xl shadow-lg pt-1">
      {/* <Paper
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
          className='text-xl text-black font-bold'
        >Certifications</Typography>
      </Paper> */}
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {certifications.map((certificate, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2
              ? (
                <CertificationTile
                  redirectUrl={certificate.redirectUrl}
                  title={certificate.title}
                  description={certificate.description}
                  image={certificate.imageURL}/>
              )
              : null}
          </div>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        className='rounded-b-3xl'
        sx={{
          backgroundColor: '#F0F4F8'
        }}
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

export default Certification
