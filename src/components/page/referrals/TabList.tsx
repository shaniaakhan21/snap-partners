import { ReactNode } from 'react'

interface IProps {
  classes?: string
  children: ReactNode
}

export const ReferralTabList = ({ classes = '', children }: IProps) => {
  return (
    <ul style={{ height: 500 }} className={`w-full relative overflow-y-auto scroll-primary ${classes}`}>
      {children}
    </ul>
  )
}
