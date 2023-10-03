import { IIconsBasicProps } from 'lib/types'

export const CustomerIcon = ({ classes = '', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} width="100%" height="116" viewBox="0 0 116 116" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="58" cy="58" r="57" fill="white" stroke="#E1E8EB" stroke-width="2"/>
      <path d="M88 85.0958V54.2689H78.4811L69.8513 30L28 44.882L38.3282 73.9273L43.5815 72.0592V85.0958H88ZM33.3866 47.4426L67.2906 35.3866L68.4522 38.6533L34.5482 50.7092L33.3866 47.4426ZM69.8652 42.6269L74.0049 54.2689H43.5815V67.5831L40.8889 68.5406L35.9612 54.6829L69.8652 42.6269ZM47.7988 70.5596V68.3214V66.0834V58.4863H69.1636H75.4575H79.9808H83.7826V80.8784H47.7988V70.5596Z" fill="#4E636E"/>
      <path d="M59.1559 64.2831H52.862H51.2986V64.839V67.0771V68.5004H53.5896H80.283V64.2831H65.4497H59.1559Z" fill="#FA4616"/>
      <path d="M68.9339 71.2984H51.2986V75.5158H68.9339V71.2984Z" fill="#FA4616"/>
    </svg>
  )
}
