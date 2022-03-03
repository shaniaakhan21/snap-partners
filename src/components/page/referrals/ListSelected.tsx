import { ReactNode } from 'react'
import { ReferralTabListItem } from './TabListItem'

interface IProps {
  id: string
  newUsers: number
  numUsers: number
  classes?: string
  children: ReactNode
}

export const ReferralListSelected = ({ id, newUsers, numUsers, classes = '', children }: IProps) => {
  return (
    <div
      id={id}
      className={`w-full referral-list--height rounded-sm bg-white p-4 overflow-y-auto scroll-primary lg:block ${classes}`}
    >
      <ReferralTabListItem id={id} isSelect newUsers={newUsers} numUsers={numUsers} noCursor />

      <hr className='border-t border-gray-300' />

      <ul>
        {children}
      </ul>
    </div>
  )
}
