import { IIconsBasicProps } from 'lib/types'

export const DownloadIcon = ({ classes = '' }: IIconsBasicProps) => (
  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className={`w-12 h-12 fill-[#ffffff] ${classes}`}>
    <path fillRule="evenodd" clipRule="evenodd" d="M9.16895 10.0632C9.16738 10.0424 9.16659 10.0213 9.16659 10V3.33333C9.16659 2.87333 9.53909 2.5 9.99992 2.5C10.4608 2.5 10.8333 2.87333 10.8333 3.33333V9.99985L12.8333 8.5C13.2016 8.2225 13.7241 8.29833 13.9999 8.66667C14.2766 9.035 14.2016 9.5575 13.8333 9.83333L10.4999 12.3333C10.3524 12.4442 10.1758 12.5 9.99992 12.5C9.83242 12.5 9.66492 12.4492 9.52075 12.3483L6.18742 10.0033C5.81075 9.73833 5.71992 9.21833 5.98492 8.8425C6.24992 8.46583 6.76909 8.375 7.14575 8.64L9.16895 10.0632ZM4.99992 14.1667V15H14.9999V14.1667C14.9999 13.7083 15.3749 13.3333 15.8333 13.3333C16.2916 13.3333 16.6666 13.7083 16.6666 14.1667V15.8333C16.6666 16.2917 16.2916 16.6667 15.8333 16.6667H4.16659C3.70825 16.6667 3.33325 16.2917 3.33325 15.8333V14.1667C3.33325 13.7083 3.70825 13.3333 4.16659 13.3333C4.62492 13.3333 4.99992 13.7083 4.99992 14.1667Z" />
  </svg>
)
