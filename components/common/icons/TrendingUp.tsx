import { IIconsBasicProps } from 'lib/types'

export const TrendingUpIcon = ({ classes = '', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} className={`w-7 h-7 fill-[#585858] hover:fill-[#6b6666] ${classes}`} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M20.9922 7.40357C20.9902 7.33157 20.9692 7.26357 20.9502 7.19457C20.9352 7.13657 20.9282 7.07757 20.9032 7.02457C20.8802 6.97257 20.8412 6.93057 20.8072 6.88257C20.7652 6.82157 20.7272 6.76057 20.6732 6.71057C20.6642 6.70157 20.6602 6.68957 20.6502 6.68157C20.6142 6.65057 20.5702 6.63957 20.5312 6.61457C20.4712 6.57557 20.4122 6.53557 20.3442 6.50957C20.2772 6.48557 20.2112 6.47957 20.1422 6.46957C20.0942 6.46257 20.0512 6.44057 20.0002 6.44057H15.0002C14.4472 6.44057 14.0002 6.88857 14.0002 7.44057C14.0002 7.99257 14.4472 8.44057 15.0002 8.44057H17.8262L13.7902 13.1486L9.51421 10.5836C9.09121 10.3276 8.54721 10.4216 8.23121 10.8006L3.23121 16.8006C2.87821 17.2246 2.93521 17.8556 3.35921 18.2086C3.54721 18.3646 3.77321 18.4406 3.99921 18.4406C4.28621 18.4406 4.57021 18.3186 4.76821 18.0806L9.22021 12.7386L13.4852 15.2986C13.9042 15.5496 14.4422 15.4616 14.7592 15.0916L19.0002 10.1436V12.4406C19.0002 12.9926 19.4472 13.4406 20.0002 13.4406C20.5532 13.4406 21.0002 12.9926 21.0002 12.4406V7.44057C21.0002 7.42757 20.9932 7.41657 20.9922 7.40357" fill="#585858"/>
    </svg>
  )
}
