import React from 'react'
import { AdjuntIcon } from "../../icons"
import { useStyles } from "./styles"

export const ReferralListSelectedItem = ({ userId, userName, numUsers, onClick }) => {
  const classes = useStyles()

  return (
    <li className={classes.item}>
      <span className={classes.name}>{userName.toUpperCase()}</span>

      <span className={classes.numUsers}>{numUsers} users</span>

      <div className={[classes.inlineFlex, classes.idContainer].join(' ')}>
        <AdjuntIcon />
        <span className={classes.textId}>ID: {userId}</span>
      </div>

      <button className={classes.button} onClick={() => onClick(userId)}>VIEW MORE</button>
    </li>
  )
}