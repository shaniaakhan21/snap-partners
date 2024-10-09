import { IIconsBasicProps } from 'lib/types'

export const PersonIcon = ({ classes = '', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} width="26" height="32" viewBox="0 0 26 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 30C2 23.9862 6.87513 19.1111 12.8889 19.1111C18.9027 19.1111 23.7778 23.9862 23.7778 30M19.1111 8.22222C19.1111 11.6587 16.3253 14.4444 12.8889 14.4444C9.45245 14.4444 6.66667 11.6587 6.66667 8.22222C6.66667 4.78578 9.45245 2 12.8889 2C16.3253 2 19.1111 4.78578 19.1111 8.22222Z" stroke="black" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}
