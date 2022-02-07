import { makeStyles } from "@material-ui/core";

const borderColor = '#D6D6D6'

export const useStyles = makeStyles((theme) => ({
  list: {
    borderBottom: `1px solid ${borderColor}`,
    padding: '0 1rem',
    margin: 0
  }
}))