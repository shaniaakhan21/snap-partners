import { IIconsBasicProps } from 'lib/types'

export const CalendarIcon = ({ classes = '', onClick = () => {} }: IIconsBasicProps) => (
  <svg viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg" className={`w-7 h-7 fill-[#8D94AC] ${classes}`} onClick={onClick}>
    <path fillRule="evenodd" clipRule="evenodd" d="M3.25 11C3.25 10.5875 3.5875 10.25 4 10.25C4.4125 10.25 4.75 10.5875 4.75 11C4.75 11.4125 4.4125 11.75 4 11.75C3.5875 11.75 3.25 11.4125 3.25 11ZM7 10.25H10C10.4125 10.25 10.75 10.5875 10.75 11C10.75 11.4125 10.4125 11.75 10 11.75H7C6.5875 11.75 6.25 11.4125 6.25 11C6.25 10.5875 6.5875 10.25 7 10.25ZM11.5 14H2.5C2.08675 14 1.75 13.6632 1.75 13.25V8.75H12.25V13.25C12.25 13.6632 11.9132 14 11.5 14ZM2.5 3.5H3.25V4.25C3.25 4.6625 3.5875 5 4 5C4.4125 5 4.75 4.6625 4.75 4.25V3.5H9.25V4.25C9.25 4.6625 9.5875 5 10 5C10.4125 5 10.75 4.6625 10.75 4.25V3.5H11.5C11.9132 3.5 12.25 3.83675 12.25 4.25V7.25H1.75V4.25C1.75 3.83675 2.08675 3.5 2.5 3.5ZM11.5 2H10.75V1.25C10.75 0.8375 10.4125 0.5 10 0.5C9.5875 0.5 9.25 0.8375 9.25 1.25V2H4.75V1.25C4.75 0.8375 4.4125 0.5 4 0.5C3.5875 0.5 3.25 0.8375 3.25 1.25V2H2.5C1.2595 2 0.25 3.0095 0.25 4.25V13.25C0.25 14.4905 1.2595 15.5 2.5 15.5H11.5C12.7405 15.5 13.75 14.4905 13.75 13.25V4.25C13.75 3.0095 12.7405 2 11.5 2Z" />
  </svg>
)
