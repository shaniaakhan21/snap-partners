import { IIconsBasicProps } from 'lib/types'

export const NotificationIcon = ({ classes = '', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} className={`w-7 h-7 fill-[#585858] hover:fill-[#6b6666] ${classes}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.5955 13.3333L5.57884 12.3483C5.89384 12.0333 6.06717 11.615 6.06717 11.17V7.27251C6.06717 6.14168 6.55884 5.06085 7.41717 4.30918C8.28217 3.55085 9.38384 3.21751 10.5313 3.36835C12.4705 3.62585 13.933 5.37918 13.933 7.44751V11.17C13.933 11.615 14.1063 12.0333 14.4205 12.3475L15.4047 13.3333H4.5955ZM11.6663 15.2842C11.6663 16.0333 10.903 16.6667 9.99967 16.6667C9.09634 16.6667 8.333 16.0333 8.333 15.2842V15H11.6663V15.2842ZM17.1005 12.6733L15.5997 11.17V7.44751C15.5997 4.54668 13.5147 2.08251 10.7497 1.71668C9.148 1.50335 7.53134 1.99251 6.31884 3.05585C5.09884 4.12418 4.4005 5.66085 4.4005 7.27251L4.39967 11.17L2.89884 12.6733C2.508 13.065 2.39217 13.6475 2.60384 14.1583C2.81634 14.67 3.3105 15 3.86384 15H6.66634V15.2842C6.66634 16.9658 8.16134 18.3333 9.99967 18.3333C11.838 18.3333 13.333 16.9658 13.333 15.2842V15H16.1355C16.6888 15 17.1822 14.67 17.3938 14.1592C17.6063 13.6475 17.4913 13.0642 17.1005 12.6733Z" fill="#B3B3B3"/>
    </svg>
  )
}
