import { IIconsBasicProps } from 'lib/types'

export const DocumentsIcon = ({ classes = '', onClick }: IIconsBasicProps) => {
  return (
      <svg onClick={onClick} width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.54102 17.541H13.9999" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
          <path d="M4.54102 12.8242H13.9999" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
          <path d="M4.54102 22.2695H13.9999" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
          <path d="M16.9548 8.68556C17.3299 9.06063 17.5406 9.56934 17.5406 10.0998V25.0005C17.5406 26.1051 16.6452 27.0005 15.5406 27.0005H3C1.89543 27.0005 1 26.1051 1 25.0005V7.73047C1 6.6259 1.89543 5.73047 3 5.73047H13.1713C13.7017 5.73047 14.2104 5.94118 14.5855 6.31625L16.9548 8.68556Z" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
          <path d="M17.5417 22.27H20.2711C21.3757 22.27 22.2711 21.3746 22.2711 20.27V5.3693C22.2711 4.83887 22.0604 4.33017 21.6853 3.95509L19.316 1.58579C18.9409 1.21071 18.4322 1 17.9018 1H7.73047C6.6259 1 5.73047 1.89543 5.73047 3V5.72943" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
      </svg>
  )
}
