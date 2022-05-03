// import { Button } from 'components/common/Button'
import { IReport } from 'lib/types/overview'
import { StarIcon } from 'components/common/icons'

export const TopCustomerAcquisition = ({ data }: { data: IReport }) => {
  const topMerchantsAcquisition = []

  return (
    <div className='overviewLayout__topCustomerAcquisition h-full p-4 bg-white rounded-md'>
      <section className='w-full flex flex-col lg:flex-row justify-start items-center gap-2 pb-3 pt-1'>
        <div className='w-10 h-10 flex justify-center items-center bg-[#139ECF] rounded-md'>
          <StarIcon classes='w-6 h-6' />
        </div>

        <div>
          <span className='text-primary-500 text-xs'>TOP Customer Acquisition</span> <br />
          <span className='text-gray-800 text-lg font-bold'>3 Last week</span>
        </div>
      </section>

      <ul className='border-t border-gray-300 w-full pt-2'>
        {
          topMerchantsAcquisition.length === 0
            ? (
              <li className='w-full flex justify-start items-center py-2 gap-x-2'>
                <div>
                  <span className='text-gray-400 font-bold'>Empty</span>
                </div>
              </li>
            )
            : topMerchantsAcquisition.map((merchant, idx) => (
              <li key={idx} className='w-full flex justify-start items-center py-2 gap-x-2'>
                <img src={merchant.imageSrc} className='w-10 h-10' />

                <div>
                  <span className='text-gray-400'>{merchant.position}</span> <br />
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
