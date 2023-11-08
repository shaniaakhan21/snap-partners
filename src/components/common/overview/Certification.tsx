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
import CertificationTile from './CertificationTile'
import { certification } from './mock'
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
        >Certifications</Typography>
      </Paper>
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

export default Certification
