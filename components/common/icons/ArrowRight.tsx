import { IIconsBasicProps } from 'lib/types'

export const ArrowRightIcon = ({ classes = '', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} className={`w-6 h-6 ${classes}`} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.4995 18.9998C10.2735 18.9998 10.0465 18.9238 9.8595 18.7678C9.4355 18.4148 9.3785 17.7838 9.7315 17.3598L14.2075 11.9888L9.8925 6.62683C9.5465 6.19683 9.6145 5.56683 10.0445 5.22083C10.4755 4.87483 11.1045 4.94283 11.4515 5.37283L16.2795 11.3728C16.5775 11.7438 16.5735 12.2738 16.2685 12.6398L11.2685 18.6398C11.0705 18.8768 10.7865 18.9998 10.4995 18.9998Z" fill="#585858"/>
    </svg>
  )
}
