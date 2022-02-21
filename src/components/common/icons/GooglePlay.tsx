import { IIconsBasicProps } from 'lib/types'

export const GooglePlayIcon = ({ classes = 'w-7 h-7', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} className={`${classes}`} width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M17.8334 10.7497L14.0834 12.6663L11.4167 9.99967L14.0834 7.33301L17.8334 9.16634C18.5001 9.49967 18.5001 10.4997 17.8334 10.7497Z' stroke='#E35C49' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/>
      <path d='M14.0834 7.33342L11.4167 10.0001L3.41675 18.0001L2.91675 18.2501C2.33341 18.5834 1.66675 18.0834 1.66675 17.4168V2.58342C1.66675 1.91676 2.33341 1.50009 2.91675 1.75009L14.0834 7.33342Z' stroke='#E35C49' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/>
      <path d='M14.0834 12.6667L3.41675 18L11.4167 10L14.0834 12.6667Z' stroke='#E35C49' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/>
      <path d='M11.4167 10L3.41675 2' stroke='#E35C49' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/>
    </svg>
  )
}
