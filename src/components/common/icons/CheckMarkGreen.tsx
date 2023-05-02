import { IIconsBasicProps, CSSProperties } from 'lib/types'

interface ICheckMarkGreenIconProps extends IIconsBasicProps {
  style?: CSSProperties;
  color?: string
}

export const CheckMarkGreenIcon = ({ classes = 'w-7 h-7', style, color = '#54A52C', onClick }: ICheckMarkGreenIconProps) => {
  return (
    <svg onClick={onClick} className={`${classes}`} style={style} width='86' height='86' viewBox='0 0 86 86' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path fillRule='evenodd' clipRule='evenodd' d='M35.3435 64.5C34.3545 64.5 33.4085 64.0915 32.7312 63.3713L15.3055 44.8132C13.9474 43.3727 14.0226 41.1044 15.4631 39.7499C16.9072 38.3954 19.1755 38.4671 20.5264 39.9076L35.3076 55.642L65.4363 22.6682C66.7765 21.2026 69.0411 21.1059 70.5031 22.4389C71.9615 23.7719 72.0619 26.0401 70.7289 27.4985L37.988 63.3318C37.3179 64.07 36.3647 64.4928 35.3685 64.5H35.3435Z' fill={color}/>
    </svg>
  )
}
