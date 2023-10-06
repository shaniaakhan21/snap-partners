import { IIconsBasicProps } from 'lib/types'

export const CopyIcon = ({ classes = '', onClick = () => {} }: IIconsBasicProps) => (
  <svg onClick={onClick} width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6465 13.1695C16.6465 15.0898 15.0898 16.6465 13.1695 16.6465H4.47701C2.55671 16.6465 1 15.0898 1 13.1695V4.47701C1 2.55671 2.55671 1 4.47701 1H13.1695C15.0898 1 16.6465 2.55671 16.6465 4.47701V13.1695Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.83057 20H16.5231C18.4434 20 20.0001 18.4432 20.0001 16.523V7.83044" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
)
