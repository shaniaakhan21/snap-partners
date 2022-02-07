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
  container: {
    width: '100%',
    height: 500,
    position: 'relative',
    margin: 0,
    padding: '0',
    overflowY: 'auto',
    [theme.breakpoints.up('md')]: {
      width: '34.5%',
      marginRight: '1rem'
    }
  },
}))