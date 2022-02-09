import { FacebookColorIcon, GoogleColorIcon, TwitterColorIcon } from 'components/common/icons'

export const RRSSAuth = () => {
  return (
    <section className='mt-8'>
      <div className='w-full flex justify-center items-center space-x-2'>
        <div className='w-full h-0.5 border-[0.5px] border-solid border-gray-200'></div>

        <div>
          <span>Or</span>
        </div>

        <div className='w-full h-0.5 border-[0.5px] border-solid border-gray-200'></div>
      </div>

      <ul className='flex flex-col sm:flex-row justify-between items-center gap-x-2 gap-y-4 mt-8'>
        <li className='w-full sm:w-fit flex justify-center items-center border border-solid border-300 rounded-sm px-8 py-2 hover:cursor-pointer hover:bg-gray-100'>
          <FacebookColorIcon />
        </li>
        <li className='w-full sm:w-fit flex justify-center items-center border border-solid border-300 rounded-sm px-8 py-2 hover:cursor-pointer hover:bg-gray-100'>
          <GoogleColorIcon />
        </li>
        <li className='w-full sm:w-fit flex justify-center items-center border border-solid border-300 rounded-sm px-8 py-2 hover:cursor-pointer hover:bg-gray-100'>
          <TwitterColorIcon />
        </li>
      </ul>
    </section>
  )
}
