import { makeStyles } from "@material-ui/core";

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

export const useStyles = makeStyles((theme) => ({
  inlineFlex: {
    display: 'inline-flex',
    alignItems: 'center'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    listStyle: 'none',
    marginBottom: '1rem',
    '&:last-child': { 
      marginBottom: 0
    },
  },
  name: {
    fontWeight: 'bold',
    color: '#404040'
  },
  textId: {
    marginLeft: '0.5rem',
    color: orangeColor
  },
  button: {
    backgroundColor: orangeColor,
    borderRadius: 26,
    fontWeight: 700,
    borderWidth: 0,
    padding: '1rem 1.25rem',
    color: whiteColor
  }
}))