import { makeStyles } from '@material-ui/core'

// COLORS to the migration
const orangeColor = '#E35C49'
const orangeColorButtonOutlinedBg = 'rgba(227, 92, 73, 0.08)'
const orangeColorButtonOutlineBorder = '#DD4C37'
const orangeColorButtonOulineBgHover = 'rgba(227, 92, 73, 0.24)'
const redColor = '#FF4343'
const whiteColor = '#fff'
const shadowColor = 'rgba(195, 197, 202, 0.07)'
const grayColor = '#8C92A9'
const divisorColor = '#ECEEF3'
const blueColor = '#139ECF'
const transparentColor = 'transparent'
const greenColor = '#008000'
const blackColor = '#18203F'

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
      width: '100%',
      color: blackColor
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
      color: blueColor,
      transition: 'color 150ms ease-in',
      '&:hover': {
        color: blueColor,
      },
      [theme.breakpoints.up('md')]: {
        color: blackColor,
      }
    },
    buttonText: {
      marginRight: '0.5rem'
    },
    link: {
      backgroundColor: orangeColorButtonOutlinedBg,
      color: orangeColor,
      textDecoration: 'none',
      border: `2px solid ${orangeColorButtonOutlineBorder}`,
      borderRadius: 2,
      marginTop: '1rem',
      width: '100%',
      padding: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 150ms ease-in',
      '&:hover': {
        backgroundColor: orangeColorButtonOulineBgHover
      },
    },
    linkText: {
      marginRight: '0.5rem',
      fontWeight: 'bold',
      fontSize: '0.75rem'
    }
  }
})
