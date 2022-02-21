import { IIconsBasicProps } from 'lib/types'

export const AppleIcon = ({ classes = 'w-7 h-7', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} className={`${classes}`} width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path fill-rule='evenodd' clip-rule='evenodd' d='M12.8334 1.66699C13 2.58366 12.5834 3.50033 12.0834 4.16699C11.5834 4.83366 10.6667 5.41699 9.75004 5.33366C9.58337 4.41699 10 3.58366 10.5 2.91699C11.0834 2.25033 12 1.75033 12.8334 1.66699ZM15.5 16.167C15.9167 15.5003 16.1667 15.0837 16.5 14.3337C13.9167 13.3337 13.5 9.66699 16.0834 8.33366C15.3334 7.33366 14.25 6.83366 13.1667 6.83366C12.4167 6.83366 11.9167 7.00033 11.4167 7.16699C11 7.33366 10.6667 7.41699 10.25 7.41699C9.75004 7.41699 9.4167 7.25033 8.9167 7.08366C8.4167 6.91699 7.9167 6.75033 7.33337 6.75033C6.1667 6.75033 4.9167 7.41699 4.1667 8.66699C3.08337 10.3337 3.25004 13.5837 5.00004 16.2503C5.75004 17.2503 6.58337 18.3337 7.6667 18.3337C8.1667 18.3337 8.4167 18.167 8.75004 18.0837C9.1667 17.917 9.58337 17.7503 10.25 17.7503C11 17.7503 11.3334 17.917 11.75 18.0837C12.0834 18.2503 12.3334 18.3337 12.8334 18.3337C14 18.3337 14.8334 17.0837 15.5 16.167Z' stroke='#E35C49' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/>
    </svg>
  )
}
