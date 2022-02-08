import { IIconsBasicProps } from 'lib/types'

export const FacebookIcon = ({ classes = '', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} className={`w-7 h-7 fill-[#585858] hover:fill-[#6b6666] ${classes}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M17 3.5C17 3.224 16.775 3 16.5 3H14C11.238 3 9 5.015 9 7.5V10.2H6.5C6.224 10.2 6 10.424 6 10.7V13.3C6 13.576 6.224 13.8 6.5 13.8H9V20.5C9 20.776 9.224 21 9.5 21H12.5C12.775 21 13 20.776 13 20.5V13.8H15.619C15.844 13.8 16.041 13.65 16.102 13.434L16.823 10.834C16.912 10.516 16.672 10.2 16.342 10.2H13V7.5C13 7.003 13.447 6.6 14 6.6H16.5C16.775 6.6 17 6.376 17 6.1V3.5Z" fill="#585858"/>
    </svg>
  )
}
