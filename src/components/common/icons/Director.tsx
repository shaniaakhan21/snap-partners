import { IIconsBasicProps } from 'lib/types'

export const Director = ({ classes = '', onClick, strokeColor }: IIconsBasicProps) => {
  return (

    <svg onClick={onClick} className={`${classes}`} width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 26.5822H37C41.2768 26.5822 44.8765 29.4434 45.3763 33.2404L47 45.5769M17 26.5822C10.1053 25.2125 4.66792 20.4786 2.95492 14.3537L2 10.9395M17 26.5822V37.7555C17 41.9692 17 44.0761 18.4645 45.3852C19.9289 46.6942 22.286 46.6942 27 46.6942C31.714 46.6942 34.071 46.6942 35.5355 45.3852C37 44.0761 37 41.9692 37 37.7555V35.5209" stroke={strokeColor} stroke-width="3" stroke-linecap="round"/>
      <path d="M27 19.8774C32.5228 19.8774 37 15.8754 37 10.9387C37 6.00199 32.5228 2 27 2C21.4772 2 17 6.00199 17 10.9387C17 15.8754 21.4772 19.8774 27 19.8774Z" stroke={strokeColor} stroke-width="3"/>
    </svg>

  )
}
