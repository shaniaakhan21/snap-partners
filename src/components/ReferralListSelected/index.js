import React from 'react'
import { ReferralTabListItem } from '../ReferralTabList/ReferralTabListItem'
import { useStyles } from './styles'

export const ReferralListSelected = ({ id, newUsers, children }) => {
  const classes = useStyles()

  return (
    <div id={id} className={classes.container}>
      <ReferralTabListItem id={id} isSelect newUsers={newUsers} noCursor />

      <hr className={classes.divisor} />

      <ul className={classes.list}>
        {children}
      </ul>
    </div>
  )
}