interface IProps {
  title: string
  subtitle: string
  caption: string
  url: string
}

export const Video = ({ title, subtitle, caption, url }: IProps) => (
  <li className='max-w-xs w-full h-min bg-white rounded-t-lg overflow-hidden'>
    <div className='w-full '>
      <iframe
        src={url}
        title={`Snap Video - ${title}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        // data-ready='true'
        className='w-full h-full aspect-video'
      />
    </div>

    <div>
      <div className='px-6 pt-4'>
        <h3 className='text-gray-1000 font-bold text-lg'>{title}</h3>
        <span>{subtitle}</span>
      </div>

      <hr className='my-4 border-gray-300' />

      <div className='px-6 pb-4'>
        <p>{caption}</p>
      </div>
    </div>
  </li>
)
