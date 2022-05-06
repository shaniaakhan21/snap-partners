import { topUsers } from 'lib/utils/topUsers'
import { IReport } from 'lib/types/overview'

export const TopMerchantsAcquisition = ({ data }: { data: IReport }) => {
  return (
    <div className='overviewLayout__topCustomerAcquisition p-4 bg-white rounded-md h-[400px]'>
      <section className='w-full flex flex-col lg:flex-row justify-start items-center gap-2 pb-3 pt-1 border-b border-gray-300'>
        <div className='w-14 h-14 flex justify-center items-center bg-[#18C8FF] bg-opacity-10 rounded-md p-2'>
          <img src='/static/glosary/merchant.png' />
        </div>

        <div>
          <span className='text-primary-500 text-lg font-bold'>TOP Merchant <br /> Acquisition</span> <br />
          {/* <span className='text-gray-800 text-lg font-bold'>3 Last week</span> */}
        </div>
      </section>

      <ul className='w-full pt-2 overflow-y-scroll h-64 lg:h-72 scroll-primary mt-1 lg:mt-2'>
        {
          topUsers.slice(0, 10).length === 0
            ? (
              <li className='w-full flex justify-start items-center py-2 gap-x-2'>
                <div>
                  <span className='text-gray-400 font-bold'>Empty</span>
                </div>
              </li>
            )
            : topUsers.slice(0, 10).map((merchant, idx) => (
              <li key={idx} className='w-full flex justify-start items-center py-2 gap-x-2'>
                {/* <img src={merchant.imageSrc} className='w-10 h-10' /> */}

                <div>
                  <span className='text-gray-400'>{idx}</span> <br />
                  <span className='text-gray-800 font-bold'>{merchant.name}</span>
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
