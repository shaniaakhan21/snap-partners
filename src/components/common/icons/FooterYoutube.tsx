import { IIconsBasicProps } from 'lib/types'

export const FooterYoutube = ({ classes = 'w-7 h-7', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} className={`${classes}`} width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d="M14.1666 16.6667H5.83329C3.33329 16.6667 1.66663 15 1.66663 12.5V7.50001C1.66663 5.00001 3.33329 3.33334 5.83329 3.33334H14.1666C16.6666 3.33334 18.3333 5.00001 18.3333 7.50001V12.5C18.3333 15 16.6666 16.6667 14.1666 16.6667Z" stroke="#E35C49" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.5 7.91666L11.5833 9.16666C12.3333 9.66666 12.3333 10.4167 11.5833 10.9167L9.5 12.1667C8.66667 12.6667 8 12.25 8 11.3333V8.83333C8 7.75 8.66667 7.41666 9.5 7.91666Z" stroke="#E35C49" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
