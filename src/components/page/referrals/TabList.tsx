import { ReactNode } from 'react'

interface IProps {
  classes?: string
  children: ReactNode
}

export const ReferralTabList = ({ classes = '', children }: IProps) => {
  return (
    <ul className={`w-full referral-list--height relative overflow-y-auto scroll-primary ${classes}`}>
      {children}
    </ul>
  )
}
