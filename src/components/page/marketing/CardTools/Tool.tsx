import Link from 'next/link'
import { GTMTrack } from 'lib/utils/gtm'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'

export const MarketingTool = ({ title, subtitle, icon, description, to }) => {
  const onClick = () => {
    GTMTrack.marketingCard(title)
  }

  return (
    <Link href={to} key={title}>
      <a className='relative h-fit flex flex-wrap max-w-full lg:max-w-[48%] w-full bg-white text-left rounded-2xl border-[1px] border-[#D4DCE3]' onClick={onClick}>
        <li>
          <section className='px-6 pb-4 pt-5'>
            <div className='text-center w-full flex justify-center'>
              <div className='w-fit'>
                {icon}
              </div>

            </div>
            {/* <p>{subtitle}</p> */}
          </section>

          <section className='px-6 flex flex-col justify-center items-center pt-2 pb-4'>

            <span className='font-bold text-xl '>
              {title} Marketing
            </span>

            <p className='mt-2 leading-5 text-center text-sm'>{description}</p>
          </section>

          <section className='w-full flex justify-center items-center pb-5'>
            <button className='uppercase text-[#E74426] px-4 py-1.5 font-semibold hover:opacity-80 flex items-center'>
              See More
              <ArrowRightAltIcon/>
            </button>
          </section>
        </li>
      </a>
    </Link>
  )
}
