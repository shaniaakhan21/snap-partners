import React from 'react'
import { AdjuntIcon } from '../icons'
import { useStyles } from './style'

export const ReferralListSelectedItemMobile = ({ userId, userName, numUsers, onClick }) => {
  const classes = useStyles()

  return (
    <li className={classes.item}>
      <span className={classes.name}>{userName.toUpperCase()}</span>

      <span className={classes.textId}>ID: {userId}</span>

      <button className={classes.button} onClick={() => onClick(userId)}>VIEW MORE</button>
    </li>
  )
}