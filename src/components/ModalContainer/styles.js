import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  modal: { 
    maxWidth: 580,
    width: 'calc(100vw - 20px)',
    maxHeight: 'calc(100vh - 60px)',
    borderRadius: '2px', 
    boxShadow: '0px 18px 17px rgba(0, 0, 0, 0.25)',
    backgroundColor: '#fff', 
    // [theme.breakpoints.up('sm')]: {
    //   width: 
    // }
  }
}))