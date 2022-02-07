import { makeStyles } from "@material-ui/core";

const transparentColor = 'transparent'
const borderColor = '#D6D6D6'
const textColor = '#8C92A9'
const selectOptionColor = '#404040'
const borderColorInputHover = '#FF998B'
const bgColorInputHover = '#ECECEC'
const borderColorInput = '#B3B3B3'

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: '1rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${borderColor}`,
    paddingBottom: '0.5rem'
  },
  form: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 40,
    marginLeft: '0.25rem'
  },
  select: {
    border: 'none',
    backgroundColor: transparentColor,
    height: '100%',
    width: 'max-content',
    padding: '0 0.25rem',
    fontSize: '1.25rem',
    textAlign: 'center',
    color: selectOptionColor,
    border: `1px solid ${borderColorInput}`,
    '&:hover': {
      backgroundColor: bgColorInputHover
    },
    '&:focus': {
      borderColor: borderColorInputHover
    },
    '&:focus-visible': {
      borderColor: 'none'
    }
  },
  option: {
    textAlign: 'left',
    
  },
  input: {
    width: '100%',
    height: '100%',
    fontSize: '1.25rem',
    outline: 'none',
    border: `1px solid ${borderColorInput}`,
    transitionProperty: 'border-color, background-color',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease-in',
    padding: '0 1rem',
    '&:hover': {
      backgroundColor: bgColorInputHover
    },
    '&:focus': {
      borderColor: borderColorInputHover
    }
  },
  contentContainer: {
    padding: '1rem 0',
    // borderBottom: `1px solid ${borderColor}`
  },
  textDefaultMsg: {
    color: textColor
  },
  textValue: {
    fontWeight: 'bold'
  }
}))

        //'py-4 border-b border-gray-200'