import { IIconsBasicProps } from 'lib/types'

export const MarketingIcon = ({ classes = '', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} className={`w-7 h-7 fill-[#585858] hover:fill-[#6b6666] ${classes}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M16.1666 19.4999C16.0016 19.4999 15.8366 19.4507 15.6958 19.3541L10.3525 15.6907H6.16665C5.70665 15.6907 5.33331 15.3174 5.33331 14.8574V9.14241C5.33331 8.68241 5.70665 8.30908 6.16665 8.30908H10.3525L15.6958 4.64575C15.95 4.47075 16.2808 4.45075 16.555 4.59575C16.8283 4.73991 17 5.02408 17 5.33325V18.6666C17 18.9757 16.8283 19.2599 16.555 19.4041C16.4333 19.4682 16.3 19.4999 16.1666 19.4999Z" fill="white"/>
    </svg>
  )
}
