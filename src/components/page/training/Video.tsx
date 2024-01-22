import { GTMTrack } from 'lib/utils/gtm'

interface IProps {
  id: string
  category: string
  title: string
  subtitle: string
  caption: string
  url: string
}

export const Video = ({ id, category, title, subtitle, caption, url }: IProps) => {
  const handleClickIFrameVideo = (e) => {
    e.preventDefault()
    const target = e.target as HTMLButtonElement
    const iframeVideo = document.getElementById(id) as HTMLIFrameElement
    iframeVideo.src += '&autoplay=1'
    target.style.display = 'none'
    GTMTrack.trainingVideo(category, title)
  }

  return (
    <li className='max-w-full w-full h-min bg-white rounded-2xl overflow-hidden shadow-lg md:shadow-[0_1px_17px_-1px_rgba(0,0,0,0.2)]'>
      <div className='relative w-full'>
        <button onClick={handleClickIFrameVideo} className='absolute top-0 bottom-0 left-0 right-0 z-10' />
        <iframe
          id={id}
          src={url}
          title={`Snap Video - ${title}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          // data-ready='true'
          className='w-full h-full aspect-video'
        />
      </div>

      <div className='bg-[#F0F4F8]  pb-4 '>
        <div className='px-6 pt-4'>
          <h3 className='text-black font-semibold text-lg text-center'>{title}</h3>
          <span>{subtitle}</span>
        </div>

        {
          caption && (
            <>
              <hr className='my-4 border-gray-300' />

              <div className='px-6'>
                <p>{caption}</p>
              </div>
            </>
          )
        }
      </div>
    </li>
  )
}
