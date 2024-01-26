import { IIconsBasicProps } from 'lib/types'

export const MarketingIcon = ({ classes = '', onClick }: IIconsBasicProps) => {
  return (
    <svg onClick={onClick} className={`w-7 h-7 fill-[#585858] hover:fill-[#6b6666] ${classes}`} width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.6652 9.6811L17.12 9.2213C17.12 9.2213 17.8192 8.62087 18.6163 8.8931C20.004 9.36687 21.6073 8.85391 22.7193 7.74051C23.0356 7.42417 23.4198 6.78947 23.4198 6.78947C23.4639 6.72927 23.4793 6.653 23.4611 6.58022L23.375 6.22612C23.3589 6.15965 23.3162 6.10295 23.2575 6.06797C23.1987 6.03366 23.128 6.02457 23.0629 6.04347L20.3315 6.80349C20.23 6.83148 20.1215 6.79368 20.06 6.70903L18.8052 4.98046C18.7667 4.92797 18.7506 4.86218 18.7597 4.79849L19.0124 2.96216C19.0257 2.8621 19.0971 2.7809 19.1943 2.75362L22.079 1.95092C22.2091 1.91451 22.2882 1.78015 22.256 1.64789L22.142 1.18392C22.1265 1.11813 22.0846 1.06214 22.0272 1.02716C22.0272 1.02716 21.8011 0.877389 21.6367 0.792739C19.9984 -0.0533607 17.9353 0.2091 16.5616 1.58352C15.5469 2.59825 15.1494 3.98813 15.3355 5.30796C15.479 6.32268 15.4118 6.86225 14.9737 7.32554C14.9338 7.36684 14.8078 7.49278 14.6133 7.68385L16.6652 9.6811Z" fill="black"/>
        <path d="M10.0025 12.1641C6.9408 15.1306 3.60123 18.3582 3.60123 18.3582C3.48716 18.4674 3.42208 18.6178 3.41997 18.7753C3.41787 18.9321 3.48017 19.0839 3.59075 19.1952L5.02121 20.6256C5.13318 20.7369 5.28434 20.7985 5.44182 20.7964C5.59929 20.795 5.74902 20.7292 5.8575 20.6159L12.0978 14.3028L10.0025 12.1641Z" fill="black"/>
        <path d="M22.9933 19.1492C23.1045 19.038 23.1661 18.8868 23.164 18.7293C23.1626 18.5719 23.0969 18.4221 22.9835 18.3129L10.7205 6.37891L8.75195 8.34821L20.7258 20.5699C20.835 20.6839 20.9848 20.749 21.1422 20.7511C21.2997 20.7532 21.4509 20.6909 21.5628 20.5797L22.9933 19.1492Z" fill="black"/>
        <path d="M11.9204 0.392978C10.4437 -0.182958 8.05596 -0.266264 6.67312 1.11591C5.58417 2.20485 3.99141 3.79834 3.99141 3.79834C3.42385 4.36518 3.95083 4.92786 3.53161 5.34636C3.11243 5.76554 2.44266 5.34636 2.0655 5.72357L0.682656 7.10704C0.48599 7.30299 0.48599 7.62211 0.682656 7.81877L2.60928 9.7454C2.80594 9.94206 3.12506 9.94206 3.32168 9.7454L4.70453 8.36255C5.08245 7.98534 4.66252 7.31562 5.08245 6.89712C5.64719 6.33166 6.26375 6.42755 6.61995 6.78304L7.33169 7.49477L8.1029 7.69771L10.0715 5.72912L9.84472 4.98169C9.21697 4.35327 9.12739 3.62612 9.52072 3.23284C10.1296 2.62398 11.1352 1.74434 12.0772 1.36713C12.6776 1.12711 12.4963 0.529448 11.9204 0.392978ZM9.24984 3.56664C9.24702 3.56875 9.51226 3.24054 9.51719 3.23633L9.24984 3.56664Z" fill="black"/>
    </svg>
  )
}
