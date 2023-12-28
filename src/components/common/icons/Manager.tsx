import { IIconsBasicProps } from 'lib/types'

export const Manager = ({ classes = '', onClick, strokeColor }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} className={`${classes}`} width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27.625 39.202L32.2375 43.118L43 33.9807M2 43.118C2 34.2868 10.0309 27.1277 19.9375 27.1277C23.7485 27.1277 27.2821 28.1871 30.1875 29.9938M30.1875 11.1373C30.1875 16.1837 25.5983 20.2747 19.9375 20.2747C14.2766 20.2747 9.6875 16.1837 9.6875 11.1373C9.6875 6.09092 14.2766 2 19.9375 2C25.5983 2 30.1875 6.09092 30.1875 11.1373Z" stroke={strokeColor || '#515151'} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  )
}
