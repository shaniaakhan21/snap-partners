import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import {
  ButtonGroup,
  Popper,
  MenuList,
  IconButton,
  Avatar,
  Grow,
  ClickAwayListener,
  MenuItem,
  Grid,
  Typography
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useStyles } from './styles'

const BtnDropdown = ({ items }) => {
  const { username } = useSelector(state => state.user)

  const [open, setOpen] = useState(false)

  const classes = useStyles()

  const history = useHistory()

  const anchorRef = useRef(null)

  const handleClose = () => {
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleMenuItemClick = (item) => {
    item.action()
    history.push(item.link)
  }

  return (
        <Grid container xs={12} item justifyContent='flex-end'>
            <ButtonGroup variant='contained' aria-label="split button" ref={anchorRef} className={classes.btnAvatar}>

                <IconButton
                    onClick={handleToggle}
                    disableTouchRipple
                    color="primary"
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                >
                  <Typography className={classes.usernameText}>
                    {username}
                  </Typography>

                  <Avatar alt='avatar' src='/svg/avatar.png' />
                </IconButton>

            </ButtonGroup>
            <Popper open={open} role={undefined} transition disablePortal anchorEl={anchorRef.current}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                        }}>
                            <ClickAwayListener onClickAway={handleClose}>
                            <MenuList id="split-button-menu" style={{ backgroundColor: '#fff' }}>
                                {items.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        onClick={(event) => handleMenuItemClick(item)}
                                    >
                                        {item.text}
                                    </MenuItem>
                                ))}
                            </MenuList>
                            </ClickAwayListener>
                    </Grow>
                )}
            </Popper>
        </Grid>
  )
}

BtnDropdown.propTypes = {
  items: PropTypes.array
}

BtnDropdown.defaultProps = {
  items: []
}

export default BtnDropdown
