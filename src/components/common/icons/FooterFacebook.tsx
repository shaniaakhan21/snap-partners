import { IIconsBasicProps } from 'lib/types'

export const FooterFacebook = ({ classes = 'w-7 h-7', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} className={`${classes}`} width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M11.6667 7.75V10.1667H13.8333C14 10.1667 14.0833 10.3333 14.0833 10.5L13.75 12.0833C13.75 12.1667 13.5833 12.25 13.5 12.25H11.6667V18.3333H9.16667V12.3333H7.75C7.58333 12.3333 7.5 12.25 7.5 12.0833V10.5C7.5 10.3333 7.58333 10.25 7.75 10.25H9.16667V7.5C9.16667 6.08333 10.25 5 11.6667 5H13.9167C14.0833 5 14.1667 5.08333 14.1667 5.25V7.25C14.1667 7.41667 14.0833 7.5 13.9167 7.5H11.9167C11.75 7.5 11.6667 7.58333 11.6667 7.75Z' stroke='#E35C49' strokeMiterlimit='10' strokeLinecap='round'/>
      <path d='M12.5 18.3333H7.50002C3.33335 18.3333 1.66669 16.6667 1.66669 12.5V7.49999C1.66669 3.33332 3.33335 1.66666 7.50002 1.66666H12.5C16.6667 1.66666 18.3334 3.33332 18.3334 7.49999V12.5C18.3334 16.6667 16.6667 18.3333 12.5 18.3333Z' stroke='#E35C49' strokeLinecap='round' strokeLinejoin='round'/>
    </svg>
  )
}
