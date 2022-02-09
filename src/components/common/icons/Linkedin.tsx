import { IIconsBasicProps } from 'lib/types'

export const LinkedinIcon = ({ classes = '', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} className={`w-7 h-7 fill-[#585858] hover:fill-[#6b6666] ${classes}`} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.80008 5.25C3.80008 4.008 4.80808 3 6.05008 3C7.29208 3 8.30008 4.008 8.30008 5.25C8.30008 6.492 7.29208 7.5 6.05008 7.5C4.80808 7.5 3.80008 6.492 3.80008 5.25ZM15.9505 8.4004C12.7195 8.4004 10.0995 11.0044 10.0995 14.2144V20.0994C10.0995 20.5964 10.5035 21.0004 11.0005 21.0004H13.0995C13.5965 21.0004 14.0005 20.5964 14.0005 20.0994V14.2144C14.0005 13.0784 14.9845 12.1704 16.1525 12.2874C17.1665 12.3884 17.8995 13.3154 17.8995 14.3344V20.0994C17.8995 20.5964 18.3035 21.0004 18.8005 21.0004H20.8995C21.3965 21.0004 21.8005 20.5964 21.8005 20.0994V14.2144C21.8005 11.0044 19.1805 8.4004 15.9505 8.4004ZM7.39968 9.2998H4.70068C4.20368 9.2998 3.79968 9.7028 3.79968 10.1998V20.0998C3.79968 20.5968 4.20368 20.9998 4.70068 20.9998H7.39968C7.89668 20.9998 8.29968 20.5968 8.29968 20.0998V10.1998C8.29968 9.7028 7.89668 9.2998 7.39968 9.2998Z" fill="#585858"/>
    </svg>
  )
}
