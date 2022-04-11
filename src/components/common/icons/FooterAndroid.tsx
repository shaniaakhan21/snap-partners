import { IIconsBasicProps } from 'lib/types'

export const FooterAndroid = ({ classes = 'w-7 h-7', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} className={`${classes}`} width='21' height='20' viewBox='0 0 21 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M18.5002 10.75L14.7502 12.6667L12.0835 10L14.7502 7.33337L18.5002 9.16671C19.1668 9.50004 19.1668 10.5 18.5002 10.75Z' stroke='#E35C49' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M14.7502 7.3333L12.0835 9.99997L4.0835 18L3.5835 18.25C3.00016 18.5833 2.3335 18.0833 2.3335 17.4166V2.5833C2.3335 1.91664 3.00016 1.49997 3.5835 1.74997L14.7502 7.3333Z' stroke='#E35C49' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M14.7502 12.6667L4.0835 18L12.0835 10L14.7502 12.6667Z' stroke='#E35C49' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round'/>
      <path d='M12.0835 10L4.0835 2.00002' stroke='#E35C49' strokeMiterlimit='10' strokeLinecap='round' strokeLinejoin='round'/>
    </svg>
  )
}
