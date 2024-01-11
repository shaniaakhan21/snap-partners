import { GTMTrack } from 'lib/utils/gtm'
import {
  DownloadIcon
  // ShareRRSSIcon
} from 'components/common/icons'
// import {
//   FacebookShareButton,
//   FacebookIcon,
//   TwitterShareButton,
//   TwitterIcon,
//   // EmailIcon,
//   // EmailShareButton,
//   RedditShareButton,
//   RedditIcon,
//   TelegramShareButton,
//   WhatsappShareButton,
//   WhatsappIcon,
//   TelegramIcon
// } from 'react-share'
import { IMarketingArticle } from 'lib/types/marketing'
// import { useCopyToClipboard } from 'lib/hooks/useCopyToClipboard'
import { ImageSkeleton } from 'components/common/ImageWithLoader'
import { useState } from 'react'

interface IArticleProps extends IMarketingArticle {
  isAuthAdmin: boolean
  linkToShare: string
}

export const Article = ({ linkToShare, id, imageId, title, subtitle, caption, hashtags, isAuthAdmin }: IArticleProps) => {
  // const { copy } = useCopyToClipboard()

  const [downloadImg, setDownloadImg] = useState(false)

  // const trackShare = (shareType: string) => {
  //   marketingSharingCard(title, shareType, downloadImg)
  // }

  const trackDownload = () => {
    setDownloadImg(true)
    GTMTrack.marketingSharingCard(title, null, true)
  }

  return (
    <li key={id} className='bg-white w-full rounded-2xl shadow-[0_1px_17px_-1px_rgba(0,0,0,0.2)]'>
      {/* <section className='flex justify-between items-center px-5 py-4 w-full'>
        <div className='flex items-center justify-start'>
          <div className='w-5 h-5 rounded-full bg-[#19191929] border border-solid border-gray-500 mr-2'></div>
          <span>Select art</span>
        </div>

        {
          isAuthAdmin && (
            <div className='flex justify-end items-center'>
              <span className='mr-4 hover:text-primary-500 cursor-pointer'>Edit</span>
              <span className='hover:text-primary-500 cursor-pointer'>Delete</span>
            </div>
          )
        }
      </section> */}

      {/* <section className='w-full border-t-4 border-primary-500'> */}
      <ImageSkeleton
        src={imageId}
        height={384}
        width={384}
      />
      {/* </section> */}

      <li className='relative -top-[4%] -right-[2%] w-full flex justify-end'>
        <div className='bg-[#E74426] w-fit p-2 rounded-full shadow-[0_1px_17px_-1px_rgba(0,0,0,0.2)]'>
          <a href={imageId} download onClick={trackDownload}>
            <DownloadIcon />
          </a>
        </div>
      </li>
      <section className='w-full px-5 py-0 text-center'>
        <span className='font-bold text-sm lg:text-2xl'>{title}</span>
        <span className='text-sm'>{subtitle}</span>
      </section>

      <section className='w-full px-5 py-3'>
        <p className=' text-[#5A748A] text-xs lg:text-lg text-center'>{caption}</p>
      </section>

      {
        hashtags[0] && (
          <ul className='w-full px-5 py-3 flex flex-wrap justify-center text-xs lg:text-sm lg:text-xl bg-[#EEF4F8] rounded-b-2xl'>
            {
              hashtags.map(hashtag => (
                <li key={hashtag} className='mr-1.5'>
                  <span className=' text-[#E74426] text-center select-none'>
                  #{hashtag}
                  </span>
                </li>
              ))
            }
          </ul>
        )
      }
    </li>
  )
}
