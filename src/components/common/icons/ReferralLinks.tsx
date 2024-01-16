import { IIconsBasicProps } from 'lib/types'

export const ReferralLinksIcon = ({ classes = '', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} className={`w-7 h-7 fill-[#585858] hover:fill-[#6b6666] ${classes}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6773 14.219L10.3438 16.5519C10.3445 16.579 10.3452 16.6061 10.3452 16.6331C10.3452 17.0162 10.2726 17.3979 10.128 17.7554C9.98203 18.1115 9.76697 18.4462 9.47288 18.7382L7.93833 20.2749C7.64424 20.5684 7.31096 20.7834 6.95353 20.9287C6.59537 21.074 6.21437 21.1466 5.83201 21.1466C5.45033 21.1466 5.06865 21.0739 4.71117 20.9301C4.35369 20.7834 4.02046 20.5683 3.72564 20.2749C3.43224 19.9815 3.21722 19.6483 3.07193 19.2908C2.92664 18.9333 2.85405 18.5516 2.85405 18.1685C2.85405 17.7868 2.92669 17.4051 3.07193 17.0476C3.21718 16.6901 3.43224 16.3568 3.72564 16.062L5.26234 14.5266C5.55574 14.2346 5.88825 14.0181 6.24645 13.8728C6.6032 13.7276 6.98561 13.6549 7.36729 13.6549C7.39436 13.6549 7.42143 13.6564 7.44777 13.6578L9.78128 11.3228C9.70863 11.2893 9.63531 11.258 9.56052 11.2281C8.85768 10.9432 8.11214 10.8008 7.36729 10.8008C6.62244 10.8008 5.87617 10.9432 5.17406 11.2281C4.47123 11.5129 3.81114 11.9431 3.24361 12.5085L1.70833 14.0453C1.14148 14.6107 0.712133 15.2715 0.427298 15.9751C0.142463 16.6788 0 17.4236 0 18.1684C0 18.9133 0.142417 19.6596 0.427252 20.3632C0.712087 21.0653 1.14148 21.7262 1.70828 22.2917C2.2744 22.8599 2.93521 23.29 3.63805 23.5735C4.34161 23.8597 5.08715 24.0008 5.83201 24.0008C6.57755 24.0008 7.32313 23.8597 8.02597 23.5735C8.7288 23.29 9.38962 22.8599 9.95573 22.2917L11.4917 20.7577C12.0578 20.1894 12.4872 19.53 12.7727 18.8279C13.0583 18.1228 13.1993 17.3779 13.2 16.6331C13.1993 15.8896 13.0583 15.1433 12.7727 14.4383C12.7421 14.3657 12.7101 14.2916 12.6773 14.219Z" fill="black"/>
        <path d="M23.5735 3.63856C23.2887 2.93504 22.8593 2.27426 22.2924 1.70823C21.7263 1.14214 21.0654 0.712091 20.3619 0.427273C19.6589 0.142409 18.9134 0 18.1685 0C17.4236 0 16.6772 0.142409 15.9744 0.427227C15.2715 0.712046 14.6106 1.14214 14.0445 1.70818L12.5084 3.24406C11.9423 3.80946 11.5129 4.47023 11.2273 5.17371C10.9417 5.87578 10.8008 6.622 10.8008 7.36754C10.8008 8.11235 10.9418 8.85785 11.2273 9.56137C11.258 9.63542 11.2893 9.70806 11.3228 9.78139L13.6564 7.44802C13.6557 7.42168 13.655 7.39534 13.655 7.36754C13.655 6.98516 13.7276 6.60282 13.8729 6.24609C14.0182 5.88863 14.2332 5.55541 14.5273 5.26062L16.062 3.72542C16.3561 3.4335 16.6894 3.21772 17.0476 3.07175C17.4036 2.92793 17.786 2.85388 18.1685 2.85388C18.5516 2.85388 18.9319 2.92793 19.2908 3.07175C19.6469 3.21772 19.9808 3.4335 20.2749 3.72542C20.5684 4.02022 20.7834 4.35344 20.9287 4.71089C21.0725 5.06835 21.1466 5.45001 21.1466 5.83167C21.1466 6.21405 21.0725 6.59498 20.9287 6.95385C20.7834 7.31131 20.5684 7.64452 20.2749 7.93791L18.7396 9.4731C18.4462 9.76649 18.1122 9.98149 17.754 10.1268C17.3972 10.272 17.0155 10.3446 16.6331 10.3446C16.606 10.3446 16.5789 10.3439 16.5526 10.3432L14.219 12.6773C14.2916 12.7101 14.3649 12.7421 14.4383 12.7713C15.1426 13.0576 15.8882 13.2 16.6331 13.2C17.3779 13.2 18.1243 13.0576 18.8264 12.7713C19.5293 12.4865 20.1894 12.0572 20.757 11.4911L22.2924 9.95519C22.8593 9.38911 23.2886 8.72833 23.5735 8.02486C23.8583 7.32279 24.0008 6.57657 24.0008 5.83176C24.0008 5.08695 23.8584 4.34063 23.5735 3.63856Z" fill="black"/>
        <path d="M7.61835 16.379C8.17788 16.9393 9.08477 16.9393 9.64357 16.379L16.3795 9.64343C16.9384 9.08462 16.9398 8.17856 16.3795 7.61833C15.82 7.05952 14.9131 7.05952 14.3543 7.61833L7.61835 14.3553C7.05951 14.9142 7.05951 15.8203 7.61835 16.379Z" fill="black"/>
    </svg>
  )
}
