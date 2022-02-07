import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  overlay: {
    backdropFilter: 'blur(1rem)',
    position: "fixed",
    top: 48.27,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: '$fadeIn 150ms ease-in',
    [theme.breakpoints.up('md')]: {
      top: 0
    }
  },
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    }
  }
}))