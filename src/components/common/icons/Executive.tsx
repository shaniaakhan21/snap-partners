import { IIconsBasicProps } from 'lib/types'

export const Executive = ({ classes = '', onClick, strokeColor }: IIconsBasicProps) => {
  return (

    <svg onClick={onClick} className={`${classes}`} width="45" height="45" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.25 16.078C19.7353 16.078 21.75 14.2771 21.75 12.0556C21.75 9.8341 19.7353 8.0332 17.25 8.0332C14.7647 8.0332 12.75 9.8341 12.75 12.0556C12.75 14.2771 14.7647 16.078 17.25 16.078Z" stroke={strokeColor} stroke-width="3"/>
      <path d="M26.25 24.124C26.25 26.3456 26.25 28.1464 17.25 28.1464C8.25 28.1464 8.25 26.3456 8.25 24.124C8.25 21.9024 12.2794 20.1016 17.25 20.1016C22.2205 20.1016 26.25 21.9024 26.25 24.124Z" stroke={strokeColor} stroke-width="3"/>
      <path d="M46.5 18.0897C46.5 25.6743 46.5 29.4668 43.8639 31.823C41.228 34.1793 36.9852 34.1793 28.5 34.1793H19.5C11.0147 34.1793 6.77209 34.1793 4.13603 31.823C1.5 29.4668 1.5 25.6743 1.5 18.0897C1.5 10.5049 1.5 6.71256 4.13603 4.35627C6.77209 2 11.0147 2 19.5 2H28.5C36.9852 2 41.228 2 43.8639 4.35627C44.9205 5.30075 45.5536 6.47594 45.933 8.03362" stroke={strokeColor} stroke-width="3" stroke-linecap="round"/>
      <path d="M39.75 18.0898H30.75" stroke={strokeColor} stroke-width="3" stroke-linecap="round"/>
      <path d="M39.75 12.0547H28.5" stroke={strokeColor} stroke-width="3" stroke-linecap="round"/>
      <path d="M39.75 24.123H33" stroke={strokeColor} stroke-width="3" stroke-linecap="round"/>
    </svg>

  )
}
