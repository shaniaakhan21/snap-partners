import React from 'react'
import { Button } from '../Button'
import { StarIcon } from '../icons'

export const TopRestaurantsAcquisition = ({ data }) => {
  const topRestaurantsAcquisition = [
    {
      imageSrc: './svg/avatarAuth.png',
      position: '1rst',
      name: 'Cameron Williamson'
    },
    {
      imageSrc: './svg/avatarAuth.png',
      position: '2nd',
      name: 'Cameron Williamson'
    },
    {
      imageSrc: './svg/avatarAuth.png',
      position: '3rd',
      name: 'Cameron Williamson'
    }
  ]

  return (
    <div className='overviewLayout__topRestaurantsAcquisition h-full p-4 bg-white rounded-md'>
      <section className='w-full flex flex-col lg:flex-row justify-start items-center gap-2 pb-3 pt-1'>
        <div className='w-10 h-10 flex justify-center items-center bg-[#139ECF] rounded-md'>
          <StarIcon classes='w-6 h-6' />
        </div>

        <div>
          <span className='text-primary-500 text-xs'>TOP Restaurants Acquisition</span> <br />
          <span className='text-gray-800 text-lg font-bold'>5 Last week</span>
        </div>
      </section>

      <ul className='border-t border-gray-300 w-full pt-2'>
        {
          topRestaurantsAcquisition.map((restaurant, idx) => (
            <li key={idx} className='w-full flex justify-start items-center py-2 gap-x-2'>
              <img src={restaurant.imageSrc} className='w-10 h-10' />

              <div>
                <span className='text-gray-400'>{restaurant.position}</span> <br />
                <span className='text-gray-800 font-bold truncate'>{restaurant.name}</span>
              </div>
            </li>
          ))
        }
      </ul>

      <section className='text-center mt-4'>
        <Button>BUTTON</Button>
      </section>
    </div>
  )
}
