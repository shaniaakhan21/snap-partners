import { makeStyles } from "@material-ui/core";

const orangeColor = '#E35C49'
const blueColor = '#139ECF'

export const useStyles = makeStyles((theme) => ({
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexEnd: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  inlineFlexText: {
    display: 'inline-flex',
    alignItems: 'center'
  },
  separation: {
    marginBottom: '1rem'
  },
  container: {
    padding: '1rem'
  },
  buttonCancel: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    margin: 0
  },
  textTitleId: {
    color: orangeColor,
    fontWeight: 'bold'
  },
  button: {
    color: '#8C92A9',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'color 150ms ease-in',
    '&:hover': {
      color: blueColor
    }
  },
  textId: {
    marginRight: '0.25rem',
  },
  divisor: {
    borderTop: '1px solid #ECEEF3'
  },
  userName: {
    display: 'block',
    color: orangeColor,
    fontWeight: 'bold'
  },
  userEmailAndPhoneContainer: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }
  },
  email: {
    marginLeft: '0.25rem',
    color: blueColor
  },
  phone: {
    marginLeft: '0.25rem',
    color: blueColor
  },
  textSponsored: {
    display: 'block',
    marginTop: '2rem'
  },
  textSponsoredStrong: {
    display: 'inline-block',
    color: orangeColor
  }
}))