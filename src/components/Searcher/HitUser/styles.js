import { makeStyles } from "@material-ui/core";

const whiteColor = '#fff'
const colorHitHover = '#ececec'
const orangeColor = '#DD4C37'
const blackColor = '#000'

export const useStyles = makeStyles((theme) => ({
  item: {
    listStyle: 'none',
    width: '100%'
  },
  link : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 0.25rem',
    backgroundColor: whiteColor,
    borderRadius: '0.25rem',
    color: blackColor,
    textDecoration: 'none',
    width: '100%',
    transition: 'background-color 150ms ease-in',
    '&:hover': {
      backgroundColor: colorHitHover
    },
    // image: {
    //   borderRadius: '0.25rem'
    // },
    resultTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: '0 0.5rem',
      whiteSpace: 'nowrap',
      overflowX: 'hidden',
      textOverflow: 'ellipsis',
    },
    resultContent: {
      display: 'block',
      whiteSpace: 'nowrap',
      overflowX: 'hidden',
      textOverflow: 'ellipsis',
      fontWeight: 'bold',
      color: orangeColor
    },
    downloadText: {
      display: 'inline-flex',
      alignItems: 'center',
    }
  }
}))

// font-bold text-brown-primary-500