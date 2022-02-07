import React from 'react'
import { AdjuntIcon } from "../../icons"
import { useStyles } from "./styles"

export const ReferralListSelectedItem = ({ userId, userName, numUsers, onClick }) => {
  const classes = useStyles()

  // Button
  return (
    <li className={classes.item}>
      <button className={classes.buttonGeneral} onClick={() => onClick(userId)}>
        <span className={classes.name}>{userName.toUpperCase()}</span>

        <span className={classes.numUsers}>{numUsers} users</span>

        <div className={[classes.inlineFlex, classes.idContainer].join(' ')}>
          <AdjuntIcon />
          <span className={classes.textId}>ID: {userId}</span>
        </div>

        <span className={classes.buttonViewMore}>VIEW MORE</span>
      </button>
    </li>
  )
}