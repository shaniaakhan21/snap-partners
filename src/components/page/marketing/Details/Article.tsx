import Image from 'next/image'

import { marketingSharingCard } from 'lib/utils/gtm'

import { ShareRRSSIcon } from 'components/common/icons'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  // EmailIcon,
  // EmailShareButton,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramIcon
} from 'react-share'
import { IMarketingArticle } from 'lib/types/marketing'
import { useCopyToClipboard } from 'lib/hooks/useCopyToClipboard'

interface IArticleProps extends IMarketingArticle {
  isAuthAdmin: boolean
  linkToShare: string
}

export const Article = ({ linkToShare, id, imageId, title, subtitle, caption, hashtags, isAuthAdmin }: IArticleProps) => {
  const { copy } = useCopyToClipboard()

  const trackShare = (shareType: string) => {
    marketingSharingCard(title, shareType)
  }

  return (
    <li key={id} className='bg-white max-w-sm w-full rounded-[4px]'>
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
      {
        imageId && (
          <Image
            src={imageId}
            className='rounded-t-[4px] w-full'
            width={384}
            height={384}
            loading='lazy'
          />
        )
      }
      {/* </section> */}

      <section className='w-full px-5 py-3'>
        <span className='font-bold text-lg'>{title}</span> <br />
        <span className='text-sm'>{subtitle}</span>
      </section>

      <section className='w-full border-t border-gray-400 px-5 py-3'>
        <p>{caption}</p>
      </section>

      {
        hashtags[0] && (
          <ul className='w-full border-t border-gray-400 px-5 py-3 flex text-sm'>
            {
              hashtags.map(hashtag => (
                <li key={hashtag} className='mr-1.5'>
                  <span className='text-blue-500 select-none'>
                  #{hashtag}
                  </span>
                </li>
              ))
            }
          </ul>
        )
      }

      <ul className='w-full border-t border-gray-400 px-5 py-4 flex justify-between items-start -mb-2'>
        <li>
          <button onClick={() => { trackShare('copyLink'); copy(linkToShare, 'Copy Link') }}>
            <ShareRRSSIcon />
          </button>
        </li>

        <li>
          <FacebookShareButton hashtag={hashtags.join(' ')} url={linkToShare} onClick={() => trackShare('Facebook')}>
            <FacebookIcon borderRadius={999} size={28} />
          </FacebookShareButton>
        </li>

        <li>
          <TwitterShareButton hashtags={hashtags} url={linkToShare} onClick={() => trackShare('Twitter')}>
            <TwitterIcon borderRadius={999} size={28} />
          </TwitterShareButton>
        </li>

        <li>
          <WhatsappShareButton url={linkToShare} onClick={() => trackShare('Whatsapp')}>
            <WhatsappIcon borderRadius={999} size={28} />
          </WhatsappShareButton>
        </li>

        <li>
          <TelegramShareButton url={linkToShare} onClick={() => trackShare('Telegram')}>
            <TelegramIcon borderRadius={999} size={28} />
          </TelegramShareButton>
        </li>

        <li>
          <RedditShareButton url={linkToShare} onClick={() => trackShare('Reddit')}>
            <RedditIcon borderRadius={999} size={28} />
          </RedditShareButton>
        </li>

        {/* <li>
          <EmailShareButton url='https://snapdeliveredteam.com/invite' onClick={() => trackShare('Email')}>
            <EmailIcon borderRadius={999} size={28} />
          </EmailShareButton>
        </li> */}
      </ul>
    </li>
  )
}
