import { makeStyles } from '@material-ui/core'

// COLORS to the migration
const orangeColor = '#E35C49'
const redColor = '#FF4343'
const whiteColor = '#fff'
const shadowColor = 'rgba(195, 197, 202, 0.07)'
const grayColor = '#8C92A9'
const divisorColor = '#ECEEF3'
const blueColor = '#139ECF'
const transparentColor = 'transparent'
const greenColor = '#008000'

export const useStyles = makeStyles(theme => {
  return {
    flexCenter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    flexBetween: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%'
    },
    inlineFlex: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    flexColCenter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    card: {
      borderRadius: 2,
      backgroundColor: whiteColor,
      boxShadow: `1px 0px 2px ${shadowColor}`,
      width: 300,
      padding: '1.5rem',
    },
    notificationSquare: {
      height: 15,
      width: 15,
      borderRadius: 1,
      backgroundColor: redColor,
      marginRight: '0.5rem',
      '&:last-child': {
        marginRight: 0
      }
    },
    notificationText: {
      color: orangeColor,
      fontWeight: 700,
      fontSize: '0.75rem',
      marginRight: '0.5rem'
    },
    notificationDate: {
      color: grayColor,
      fontWeight: 700,
      fontSize: '0.75rem',
      marginRight: '0.5rem'
    },
    title: {
      margin: '1rem 0',
      width: '100%'
    },
    image: {
      display: 'block',
      margin: '1rem auto'
    },
    divisor: {
      borderTop: `1px solid ${divisorColor}`,
      margin: '1rem auto',
      width: '100%'
    },
    button: {
      backgroundColor: transparentColor,
      border: 'none',
      cursor: 'pointer',
      color: 'black',
      transition: 'color 150ms ease-in',
      '&:hover': {
        color: blueColor,
      }
    },
    buttonText: {
      marginRight: '0.5rem'
    },
    link: {
      color: whiteColor,
      backgroundColor: orangeColor,
      textDecoration: 'none',
      border: `1px solid ${orangeColor}`,
      borderRadius: 2,
      marginTop: '1rem',
      width: '100%',
      padding: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transitionProperty: 'color, background-color',
      transitionDuration: '150ms',
      transitionTimingFunction: '150ms',
      '&:hover': {
        color: whiteColor,
        backgroundColor: orangeColor
      },
      [theme.breakpoints.up('md')]: {
        backgroundColor: transparentColor,
        color: orangeColor,
      }
    },
    linkText: {
      marginRight: '0.5rem',
      fontWeight: 'bold',
      fontSize: '0.75rem'
    }
  }
})
