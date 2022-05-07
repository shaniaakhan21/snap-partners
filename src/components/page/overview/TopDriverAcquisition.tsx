// import { Button } from 'components/common/Button'
import { IReport } from 'lib/types/overview'
import { EmptyData } from 'components/common/EmptyData'

export const TopDriverAcquisition = ({ data }: { data: IReport }) => {
  return (
    <div className='overviewLayout__topDriverAcquisition p-4 bg-white rounded-md h-[400px]'>
      <section className='w-full flex flex-col lg:flex-row justify-start items-center gap-2 pb-3 pt-1 border-b border-gray-300'>
        <div className='w-14 h-14 flex justify-center items-center bg-[#18C8FF] bg-opacity-10 rounded-md p-2'>
          <img src='/static/glosary/driver.png' />
        </div>

        <div>
          <span className='text-primary-500 text-lg font-bold'>TOP Driver <br /> Acquisition</span> <br />
          {<span className='text-gray-800 text-lg font-bold'>Last 7 days</span>}
        </div>
      </section>

      <ul className='w-full pt-2 overflow-y-scroll h-64 lg:h-72 scroll-primary mt-1 lg:mt-2'>
        {
          data.topUsers.topDriver.length === 0
            ? (
              <li className='w-full flex justify-center items-center h-full -mt-4'>
                <EmptyData classes='w-52 h-52' description='Top Driver Empty' />
              </li>
            )
            : data.topUsers.topDriver.map((merchant, idx) => (
              <li key={idx} className='w-full flex justify-start items-center py-2 gap-x-2'>
                {/* <img src={merchant.imageSrc} className='w-10 h-10' /> */}

                <div>
                  <span className='text-gray-800 font-bold'>{merchant.amount}{' '}</span>
                  <span className='text-gray-800'>new drivers by {' '}</span>
                  <span className='text-gray-800 font-bold'>{merchant.name}!</span>
                </div>
              </li>
            ))
        }
      </ul>

      {/* <section className='text-center mt-4'>
        <Button>BUTTON</Button>
      </section> */}
    </div>
  )
}
