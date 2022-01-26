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
    fontSize: '0.75rem',
    color: '#404040',
    width: '34%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'center'
  },
  textId: {
    color: orangeColor,
    fontSize: '0.75rem',
    width: '33%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'center'
  },
  button: {
    width: '33%',
    backgroundColor: orangeColor,
    borderRadius: 26,
    fontWeight: 700,
    fontSize: '0.75rem',
    borderWidth: 0,
    padding: '0.5rem 0',
    color: whiteColor,
  }
}))