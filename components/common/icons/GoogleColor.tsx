import { IIconsBasicProps } from 'lib/types'

export const GoogleColorIcon = ({ classes = '', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} className={`w-7 h-7 fill-[#585858] hover:fill-[#6b6666] ${classes}`} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.6437 10.0273H13.714C13.3202 10.0273 13.0015 10.3461 13.0015 10.7398V13.5945C13.0015 13.9883 13.3202 14.307 13.714 14.307H18.7437C18.1952 15.7367 17.164 16.932 15.8562 17.6914L17.9983 21.4039C21.4343 19.4164 23.4687 15.9242 23.4687 12.0195C23.4687 11.4617 23.4265 11.0633 23.3468 10.618C23.2812 10.2758 22.9858 10.0273 22.6437 10.0273Z" fill="#167EE6"/>
      <path d="M12.5232 18.5906C10.0623 18.5906 7.91543 17.2453 6.7623 15.2578L3.0498 17.3953C4.93887 20.6719 8.47793 22.875 12.5232 22.875C14.5107 22.875 16.3811 22.3406 17.9982 21.4078V21.4031L15.8561 17.6906C14.8717 18.2625 13.7373 18.5906 12.5232 18.5906Z" fill="#12B347"/>
      <path d="M17.9938 21.4086V21.4039L15.8516 17.6914C14.8719 18.2586 13.7375 18.5914 12.5234 18.5914V22.8758C14.5109 22.8758 16.3813 22.3414 17.9938 21.4086Z" fill="#0F993E"/>
      <path d="M5.8625 11.9305C5.8625 10.7164 6.19531 9.58203 6.7625 8.60234L3.05 6.46484C2.1125 8.07266 1.57812 9.93828 1.57812 11.9305C1.57812 13.9227 2.1125 15.7883 3.05 17.3961L6.7625 15.2586C6.19063 14.2789 5.8625 13.1445 5.8625 11.9305Z" fill="#FFD500"/>
      <path d="M12.5232 5.26875C14.1264 5.26875 15.6029 5.84063 16.7514 6.7875C17.0373 7.02188 17.4498 7.00312 17.7076 6.74531L19.7279 4.725C20.0232 4.42969 19.9998 3.94688 19.6857 3.675C17.7592 1.99688 15.2514 0.984375 12.5232 0.984375C8.47793 0.984375 4.93887 3.1875 3.0498 6.46406L6.7623 8.60156C7.91543 6.61406 10.0623 5.26875 12.5232 5.26875Z" fill="#FF4B26"/>
      <path d="M16.7516 6.7875C17.0375 7.02188 17.45 7.00312 17.7078 6.74531L19.7281 4.725C20.0234 4.42969 20 3.94688 19.6859 3.675C17.7594 1.99688 15.2516 0.984375 12.5234 0.984375V5.26875C14.1266 5.26875 15.6031 5.83594 16.7516 6.7875Z" fill="#D93F21"/>
    </svg>
  )
}