import { IIconsBasicProps } from 'lib/types'

export const IBORankIcon = ({ classes = '', strokeColor }: IIconsBasicProps) => (
  <svg width="39" height="44" viewBox="0 0 39 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${classes}`}>
    <path d="M2 42.2241C2 33.5849 9.83503 26.5814 19.5 26.5814C29.165 26.5814 37 33.5849 37 42.2241M29.5 10.9387C29.5 15.8754 25.0228 19.8774 19.5 19.8774C13.9771 19.8774 9.5 15.8754 9.5 10.9387C9.5 6.00199 13.9771 2 19.5 2C25.0228 2 29.5 6.00199 29.5 10.9387Z" stroke={strokeColor} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
)
