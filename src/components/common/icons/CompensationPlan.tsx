import { IIconsBasicProps } from 'lib/types'

export const CompensationPlanIcon = ({ classes = '', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.2273 3.82609V0M7.72727 17.2174H5.81818M19.1818 17.2174H9.63636M7.72727 13.3913H5.81818M19.1818 13.3913H9.63636M6.77273 3.82609V0M2 8.6087H23M4 3.82609H21C22.1046 3.82609 23 4.72152 23 5.82609V20C23 21.1046 22.1046 22 21 22H4C2.89543 22 2 21.1046 2 20V5.82609C2 4.72152 2.89543 3.82609 4 3.82609Z" stroke="black" stroke-width="2.5"/>
    </svg>

  )
}
