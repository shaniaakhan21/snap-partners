import { IIconsBasicProps } from 'lib/types'

export const DashboardIcon = ({ classes = '', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} className={`w-7 h-7 fill-[#585858] hover:fill-[#6b6666] ${classes}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M19.5 8.66667V7C19.5 5.62167 18.3783 4.5 17 4.5H7C5.62167 4.5 4.5 5.62167 4.5 7V8.66667H19.5ZM4.5 10.3333V17C4.5 18.3783 5.62167 19.5 7 19.5H11.1667V10.3333H4.5ZM12.8333 19.5V10.3333H19.5V17C19.5 18.3783 18.3783 19.5 17 19.5H12.8333Z" fill="white"/>
    </svg>
  )
}
