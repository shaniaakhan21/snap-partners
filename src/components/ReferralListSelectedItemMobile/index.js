import React from 'react'
import { useStyles } from './style'

export const ReferralListSelectedItemMobile = ({ userId, userName, numUsers, onClick }) => {
  const classes = useStyles()

  return (
    <li className={classes.item}>
      <button className={classes.buttonGeneral} onClick={() => onClick(userId)}>
        <span className={classes.name}>{userName.toUpperCase()}</span>

        <span className={classes.textId}>ID: {userId}</span>

        <span className={classes.buttonViewMore}>VIEW MORE</span>
      </button>
    </li>
  )
}