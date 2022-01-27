import { makeStyles } from "@material-ui/core";

const orangeColor = '#E35C49'

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
  textId: {
    marginRight: '0.25rem',
    color: '#8C92A9'
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
    color: '#139ECF'
  },
  phone: {
    marginLeft: '0.25rem',
    color: '#139ECF'
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