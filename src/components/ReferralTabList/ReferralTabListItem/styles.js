import { makeStyles } from "@material-ui/core";

// COLORS to the migration
const orangeColor = '#E35C49'
const orangeColorHover = '#C54532'
const redColor = '#FF4343'
const whiteColor = '#fff'
const shadowColor = 'rgba(195, 197, 202, 0.07)'
const grayColor = '#8C92A9'
const divisorColor = '#ECEEF3'
const blueColor = '#139ECF'
const transparentColor = 'transparent'
const greenColor = '#008000'

export const useStyles = makeStyles((theme) => ({
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
  item: {
    backgroundColor: '#fff',
    borderRadius: 2,
    boxShadow: '1px 0px 2px rgba(195, 197, 202, 0.07)',
    listStyle: 'none',
    position: 'relative',
    marginBottom: '1rem',
    '&:last-child': { 
      marginBottom: 0
    },
  },
  selectReference: {
    position: 'absolute',
    top: '0.8rem',
    left: '0.25rem',
    borderRadius: '100%',
    backgroundColor: orangeColor,
    width: 8,
    height: 8
  },
  button: {
    backgroundColor: 'transparent',
    border: '1px solid transparent',
    borderRadius: 2,
    width: '100%',
    height: '100%',
    padding: '0.5rem 0.5rem 0.5rem 1.25rem',
    textAlign: 'left',
    transition: 'border-color 150ms ease-in'
  },
  buttonHover: {
    borderColor: orangeColor,
  },
  headerLevelText: {
    color: orangeColor
  },
  headerTotalText: {
    marginLeft: '0.25rem',
    color: orangeColor
  },
  contentUserText: {
    display: 'block',
    margin: '0.25rem 0'
  },
  contentNewUsersText: {
    display: 'block',
  },
  contentNewUserIndicator: {
    color: greenColor
  }
}))