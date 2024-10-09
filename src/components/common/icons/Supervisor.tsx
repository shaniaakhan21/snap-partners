import { IIconsBasicProps } from 'lib/types'

export const Supervisor = ({ classes = '', onClick, strokeColor }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} className={`${classes}`} width="42" height="46" viewBox="0 0 42 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5 25.3516H30.5C34.5629 25.3516 37.9827 28.0698 38.4574 31.6769L40 43.3966M11.5 25.3516C7.43704 25.3516 4.01723 28.0698 3.54251 31.6769L2 43.3966M11.5 25.3516V35.9663C11.5 39.9693 11.5 41.9708 12.8913 43.2144C14.2825 44.458 16.5217 44.458 21 44.458C25.4783 44.458 27.7174 44.458 29.1087 43.2144C30.5 41.9708 30.5 39.9693 30.5 35.9663V33.8433" stroke={strokeColor} stroke-width="3" stroke-linecap="round"/>
      <path d="M21 18.9835C26.2467 18.9835 30.5 15.1816 30.5 10.4918C30.5 5.80189 26.2467 2 21 2C15.7533 2 11.5 5.80189 11.5 10.4918C11.5 15.1816 15.7533 18.9835 21 18.9835Z" stroke={strokeColor} stroke-width="3"/>
    </svg>

  )
}
