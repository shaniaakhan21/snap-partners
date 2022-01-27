import { makeStyles } from "@material-ui/core";

// COLORS to the migration
const orangeColor = '#E35C49'
const orangeColorButtonFilledBg = '#DD4C37'
const orangeColorButtonFilledBgHover = '#C54532'
const borderRadiusButtonFilled = 26
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
    alignItems: 'center',
    justifyContent: 'center'
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
    color: '#404040',
    // width: 150,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '25%',
    textAlign: 'center'
  },
  numUsers: {
    width: '25%',
    textAlign: 'center'
  },
  idContainer: {
    width: '25%',
  },
  textId: {
    marginLeft: '0.25rem',
    color: orangeColor,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  button: {
    backgroundColor: orangeColorButtonFilledBg,
    color: whiteColor,
    borderRadius: borderRadiusButtonFilled,
    fontWeight: 700,
    maxWidth: 120,
    height: 39,
    width: '25%',
    padding: '0.75rem 0',
    cursor: 'pointer',
    border: `1px solid ${orangeColor}`,
    transition: 'background-color 150ms ease-in',
    '&:hover': {
      backgroundColor: orangeColorButtonFilledBgHover,
    }
  }
}))