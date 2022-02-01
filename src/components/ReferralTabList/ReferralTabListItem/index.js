import React, { useState } from 'react'
import { EyeIcon } from '../../icons'
import { useStyles } from './styles'

export const ReferralTabListItem = ({ isSelect = false, id, newUsers, numUsers, noCursor = false, onClick = () => {} }) => {
  const [isButtonHover, setIsButtonHover] = useState(false)

  const classes = useStyles()

  const handleMouseEnter = () => {
    if (noCursor) return

    setIsButtonHover(true)
  }

  const handleMouseLeave = () => {
    if (noCursor) return

    setIsButtonHover(false)
  }

  return (
    <li className={classes.item}>
      {isSelect && <div className={classes.selectReference} />}
      <button 
        style={{ cursor: noCursor ? 'auto' : 'pointer' }}
        className={[classes.button, isButtonHover ? classes.buttonHover : ''].join(' ')}
        onClick={() => onClick(id)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={classes.flexBetween}>
          <span className={classes.headerLevelText}>Level {id}</span>
          <div className={classes.flexCenter}>
            <EyeIcon />
            <span className={classes.headerTotalText}>See income</span>
          </div>
        </div>

        <span className={classes.contentUserText}>{numUsers} Users</span>

        <span className={[classes.contentNewUsersText, newUsers > 0 ? classes.contentNewUserIndicator : ''].join(' ')}>{newUsers} New Users</span>
      </button>
    </li>
  )
}