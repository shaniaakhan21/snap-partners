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
    position: 'relative',
    margin: 0,
    // padding: '1rem 1rem 1rem 2rem',
    padding: '1rem 0',
    [theme.breakpoints.up('md')]: {
      width: '30%',
      marginRight: '1rem'
    }
  },
}))