import { IIconsBasicProps } from 'lib/types'

interface IArrowBackPageProps extends IIconsBasicProps {
  isHovered?: boolean
}

export const ArrowLeftIcon = ({ classes = 'w-7 h-7', onClick, isHovered }: IArrowBackPageProps) => {
  return (
    <svg onClick={onClick} className={`fill-[#18203F] ${classes} ${isHovered && 'hover:fill-primary-500'}`} width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path fillRule='evenodd' clipRule='evenodd' d='M12.725 17.125C12.4695 17.125 12.2158 17.0139 12.0425 16.7986L7.81802 11.5486C7.55727 11.224 7.56077 10.7602 7.82764 10.44L12.2026 5.18999C12.5115 4.81899 13.0636 4.76911 13.4355 5.07799C13.8065 5.38686 13.8564 5.93899 13.5466 6.30999L9.63102 11.0096L13.4066 15.7014C13.7094 16.0776 13.6499 16.6289 13.2728 16.9316C13.1118 17.062 12.9175 17.125 12.725 17.125'/>
    </svg>
  )
}
