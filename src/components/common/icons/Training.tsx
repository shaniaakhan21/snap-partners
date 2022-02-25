import { IIconsBasicProps } from 'lib/types'

export const TrainingIcon = ({ classes = 'w-7 h-7', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} className={`${classes}`} width='16' height='15' viewBox='0 0 16 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M1.33331 2.1891L1.84287 1.88304C3.62631 0.811797 6.34393 0.964831 7.95752 2.1891C9.65603 0.964831 12.5435 0.888314 14.4119 2.03607L14.6666 2.1891L13.9872 13.6667H2.09764L1.33331 2.1891Z' stroke='white' strokeWidth='1.5' strokeMiterlimit='10'/>
      <path d='M10.4674 6.13763C10.4674 4.63763 9.05069 3.38763 7.46735 3.72096C6.55069 3.88763 5.71735 4.63763 5.55069 5.63763C5.38402 6.5543 5.63402 7.3043 6.21735 7.88763C6.80069 8.47096 7.05069 9.3043 6.88402 10.0543V10.3043C6.88402 10.8043 7.38402 11.1376 7.96735 11.1376C8.55069 11.1376 9.05069 10.8043 9.05069 10.3043V10.0543C8.96735 9.22096 9.21735 8.38763 9.80069 7.8043C10.2174 7.38763 10.4674 6.8043 10.4674 6.13763Z' stroke='white' strokeWidth='0.8' strokeMiterlimit='10'/>
      <path d='M7.96737 8.63763V7.8043L7.13403 6.97096' stroke='white' strokeWidth='0.8' strokeMiterlimit='10' strokeLinecap='round'/>
      <path d='M8.80068 6.97096L7.96735 7.8043' stroke='white' strokeWidth='0.8' strokeMiterlimit='10' strokeLinecap='round'/>
      <path d='M6.88403 9.30428H9.13403' stroke='white' strokeWidth='0.8' strokeMiterlimit='10'/>
      <path d='M8 3.66667V2' stroke='white' strokeMiterlimit='10'/>
      <path d='M8 13.5V11.1667' stroke='white' strokeMiterlimit='10'/>
    </svg>
  )
}
