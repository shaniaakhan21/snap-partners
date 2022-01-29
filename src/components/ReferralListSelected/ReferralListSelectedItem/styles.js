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
const greenColor = '#008000'
const transparentColor = 'transparent'

export const useStyles = makeStyles((theme) => ({
  inlineFlex: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    padding: 0,
    listStyle: 'none',
    marginBottom: '1rem',
    '&:last-child': { 
      marginBottom: 0
    },
  },
  buttonGeneral: {
    backgroundColor: transparentColor,
    border: 'none',
    width: '100%',
    height: 65,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'background-color 150ms ease-in',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#ECECEC'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 0.5rem',
    }
  },
  name: {
    color: '#404040',
    fontWeight: 'bold',
    width: '25%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'left',
    margin: '0 auto'
  },
  numUsers: {
    width: '25%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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
  buttonViewMore: {
    backgroundColor: orangeColorButtonFilledBg,
    color: whiteColor,
    borderRadius: borderRadiusButtonFilled,
    fontWeight: 700,
    maxWidth: 120,
    height: 39,
    width: '25%',
    border: `1px solid ${orangeColor}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 150ms ease-in',
    '&:hover': {
      backgroundColor: orangeColorButtonFilledBgHover,
    }
  }
}))