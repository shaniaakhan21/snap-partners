import React from 'react'

export const StarIcon = ({ classes = '', onClick = () => {} }) => {
  return (
    <svg onClick={onClick} className={`w-7 h-7 fill-[#585858] hover:fill-[#6b6666] ${classes}`} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M18.3116 21.4414C18.1536 21.4414 17.9946 21.4044 17.8486 21.3284L12.7496 18.6644L7.65159 21.3284C7.31359 21.5034 6.90559 21.4734 6.59959 21.2494C6.29159 21.0254 6.13859 20.6464 6.20359 20.2714L7.17459 14.6434L3.05459 10.6584C2.78059 10.3934 2.68159 9.99537 2.79859 9.63137C2.91559 9.26937 3.22859 9.00437 3.60659 8.95037L9.30659 8.12237L11.8546 2.99637C12.1926 2.31637 13.3076 2.31637 13.6456 2.99637L16.1936 8.12237L21.8936 8.95037C22.2716 9.00437 22.5846 9.26937 22.7016 9.63137C22.8186 9.99537 22.7196 10.3934 22.4456 10.6584L18.3256 14.6434L19.2966 20.2714C19.3616 20.6464 19.2076 21.0254 18.9006 21.2494C18.7266 21.3774 18.5196 21.4414 18.3116 21.4414Z" fill="white" fillOpacity="0.8"/>
    </svg>
  )
}
