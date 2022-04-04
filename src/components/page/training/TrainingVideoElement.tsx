export const TrainingVideoElement = ({ src }: { src: string }) => (
  <li className='max-w-xs w-full h-min bg-white rounded-t-lg overflow-hidden'>
    <div className='w-full '>
      <iframe
        src={src}
        title='Snap Video'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        // data-ready='true'
        className='w-full h-full aspect-video'
      />
    </div>

    <div>
      <div className='px-6 pt-4'>
        <h3 className='text-gray-1000 font-bold text-lg'>Big Title</h3>
        <span>Big Subtitle</span>
      </div>

      <hr className='my-4 border-gray-300' />

      <div className='px-6 pb-4'>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta voluptates consectetur officia illo quas, vitae reiciendis aut, cupiditate distinctio cum facere repellendus quia eum quos.
        </p>
      </div>
    </div>
  </li>
)
