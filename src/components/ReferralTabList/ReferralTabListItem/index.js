import React from 'react'
import { EyeIcon } from '../../icons'
import { useStyles } from './styles'

export const ReferralTabListItem = ({ isSelect = false, id, newUsers = 0, onClick = () => {} }) => {
  const classes = useStyles()

  return (
    <li className={classes.item}>
      {isSelect && <div className={classes.selectReference} />}
      <button id={id} className={classes.button} onClick={onClick}>
        <div className={classes.flexBetween}>
          <span className={classes.headerLevelText}>Level {id}</span>
          <div className={classes.flexCenter}>
            <EyeIcon />
            <span className={classes.headerTotalText}>{isSelect ? 'See total income' : 'See income'}</span>
          </div>
        </div>

        <span className={classes.contentUserText}>3356 Users</span>

        <span className={[classes.contentNewUsersText, newUsers > 0 ? classes.contentNewUserIndicator : ''].join(' ')}>{newUsers} New Users</span>
      </button>
    </li>
  )
}