import { TabScrollButton, withStyles } from '@material-ui/core'

const HiddenTabScrollButton = withStyles(theme => ({
  root: {
    width: 28,
    overflow: 'hidden',
    transition: 'width 0.2s',
    '&.Mui-disabled': {
      width: 0
    }
  }
}))(TabScrollButton)

export default HiddenTabScrollButton
