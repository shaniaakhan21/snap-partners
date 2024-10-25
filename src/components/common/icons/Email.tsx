import { IIconsBasicProps } from 'lib/types'

export const EmailIcon = ({ classes = '' }: IIconsBasicProps) => (
  <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" className={`w-7 h-7 fill-[#8D94AC] ${classes}`}>
    <path fillRule="evenodd" clipRule="evenodd" d="M14.25 13.5H3.75C3.33675 13.5 3 13.164 3 12.75V5.4375L8.55 9.6C8.6835 9.7005 8.84175 9.75 9 9.75C9.15825 9.75 9.3165 9.7005 9.45 9.6L15 5.4375V12.75C15 13.164 14.6632 13.5 14.25 13.5ZM13.7498 4.5L9 8.0625L4.25025 4.5H13.7498ZM14.25 3H3.75C2.5095 3 1.5 4.0095 1.5 5.25V12.75C1.5 13.9905 2.5095 15 3.75 15H14.25C15.4905 15 16.5 13.9905 16.5 12.75V5.25C16.5 4.0095 15.4905 3 14.25 3Z" />
  </svg>
)
