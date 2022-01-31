import { FacebookIcon, GoogleIcon, LinkedinIcon, ShareIcon, ShareRRSSIcon, TwitterIcon } from 'components/common/icons'

interface IArticleProps {
  id: string
  imageSrc: string
  title: string
  subtitle: string
  description: string
  hashtags: string[]
  linkToShare: string
}

export const Article = ({ id, imageSrc, title, subtitle, description, hashtags, linkToShare }: IArticleProps) => {
  return (
    <li key={id} className='bg-white max-w-xs w-full rounded-[4px]'>
      <section className='flex justify-start items-center px-5 py-4 w-full'>
        <div className='w-5 h-5 rounded-full bg-[#19191929] border border-solid border-gray-500 mr-2'></div>
        <span>Select art</span>
      </section>

      <section className='w-full border-t-4 border-primary-500'>
        <img src={imageSrc} />
      </section>

      <section className='w-full border-t border-gray-400 px-5 py-3'>
        <span className='font-bold text-lg'>{title}</span> <br />
        <span className='text-sm'>{subtitle}</span>
      </section>

      <section className='w-full border-t border-gray-400 px-5 py-3'>
        <p>{description}</p>
      </section>

      <ul className='w-full border-t border-gray-400 px-5 py-3 flex text-sm'>
        {
          hashtags.map(hashtag => (
            <li key={hashtag} className='mr-1.5'>
              <a href={linkToShare} target='_blank' rel='noopener noreferrer'>
                {hashtag}
              </a>
            </li>
          ))
        }
      </ul>

      <ul className='w-full border-t border-gray-400 px-5 py-4 flex justify-between items-center'>
        <li>
          <a href='#' target='_blank' rel='noopener noreferrer'>
            <ShareRRSSIcon />
          </a>
        </li>

        <li>
          <a href='#' target='_blank' rel='noopener noreferrer'>
            <GoogleIcon />
          </a>
        </li>

        <li>
          <a href='#' target='_blank' rel='noopener noreferrer'>
            <ShareIcon />
          </a>
        </li>

        <li>
          <a href='#' target='_blank' rel='noopener noreferrer'>
            <FacebookIcon />
          </a>
        </li>

        <li>
          <a href='#' target='_blank' rel='noopener noreferrer'>
            <LinkedinIcon />
          </a>
        </li>

        <li>
          <a href='#' target='_blank' rel='noopener noreferrer'>
            <TwitterIcon />
          </a>
        </li>
      </ul>
    </li>
  )
}
