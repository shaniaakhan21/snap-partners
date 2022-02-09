import { IIconsBasicProps } from 'lib/types'

export const FacebookColorIcon = ({ classes = '', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} className={`w-7 h-7 fill-[#585858] hover:fill-[#6b6666] ${classes}`} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.5 8.25H14V5.25C14 4.422 14.672 3.75 15.5 3.75H17V0H14C11.5145 0 9.5 2.0145 9.5 4.5V8.25H6.5V12H9.5V24H14V12H17L18.5 8.25Z" fill="#1976D2"/>
    </svg>
  )
}
