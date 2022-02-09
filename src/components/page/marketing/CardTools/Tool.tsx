import Link from 'next/link'

export const MarketingTool = ({ title, subtitle, icon, description, to }) => {
  return (
    <Link href={to} key={title}>
      <a className='relative h-[394px] flex flex-col max-w-[248px] w-full rounded-t-sm bg-white m-0 text-left mt-5'>
        <li>
          <div className='absolute w-full h-1 bg-primary-300 top-0 left-0 rounded-t-[4px]'></div>

          <section className='px-6 pb-4 pt-5'>
            <span className='font-bold text-xl'>{title}</span>
            <p>{subtitle}</p>
          </section>

          <section className='px-6 flex flex-col justify-center items-center border-t-2 border-solid pt-2 pb-4'>
            <div className='w-fit'>
              {icon}
            </div>

            <p className='mt-6 leading-5 text-sm'>{description}</p>
          </section>

          <section className='w-full border-t-2 border-solid flex justify-center items-center py-5'>
            <button className='uppercase text-white bg-primary-500 px-4 py-1.5 rounded-full font-semibold hover:opacity-80'>
              See More
            </button>
          </section>
        </li>
      </a>
    </Link>
  )
}