import React from 'react'
import { AdjuntIcon } from "../../icons"
import { useStyles } from "./styles"

export const ReferralListSelectedItem = () => {
  const classes = useStyles()

  return (
    <li className={classes.item}>
      <span className={classes.name}>JAMES HUNT</span>

      <span>5622 users</span>

      <div className={classes.inlineFlex}>
        <AdjuntIcon />
        <span className={classes.textId}>ID: 00000000</span>
      </div>

      <button className={classes.button}>VIEW MORE</button>
    </li>
  )
}