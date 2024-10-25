import { IIconsBasicProps } from 'lib/types'

export const CheckIcon = ({ classes = '', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} className={`w-3 h-3 fill-[#585858] hover:fill-[#6b6666] ${classes}`} width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path fillRule='evenodd' clipRule='evenodd' d='M6.03854 1.42926C6.39259 0.962043 7.07178 0.860491 7.55554 1.20244C8.0393 1.54439 8.14445 2.20035 7.79039 2.66757L4.43119 7.10046C4.06878 7.5787 3.36974 7.63233 2.93862 7.21496L0.317012 4.67696C-0.106383 4.26707 -0.105565 3.6033 0.318838 3.19438C0.743241 2.78546 1.43052 2.78625 1.85391 3.19614L3.49539 4.78526L6.03854 1.42926Z' fill='white'/>
    </svg>
  )
}
