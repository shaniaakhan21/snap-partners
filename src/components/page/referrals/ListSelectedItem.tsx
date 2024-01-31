import { AdjuntIcon } from 'components/common/icons'

export const ReferralListSelectedItem = ({ userId, userName, lastName, numUsers, onClick }) => {
  return (
    <li className='mb-4 last:mb-0 bg-[#F5F9FD] rounded-lg border border-[#CFDFEC]'>
      <button className='w-full h-16 flex items-center justify-between transition-colors lg:px-2 hover:bg-[#ddedfd]' onClick={() => onClick(userId)}>
        <span className='font-bold w-1/3 truncate text-sm text-left text-gray-800 mx-2 hover:text-primary-500'>{userName?.toUpperCase()} {lastName?.toUpperCase()}</span>

        {/* <span className='w-1/4 truncate text-sm text-center'>{numUsers} users</span> */}

        <div className='inline-flex items-center w-1/3'>
          <div style={{ transform: 'rotate(45deg)' }}>
            <AdjuntIcon classes='w-5 h-5' />
          </div>
          <span className='ml-1 text-primary-500 hover:text-black  text-sm truncate font-semibold'>ID: {userId}</span>
        </div>

        <span style={{ maxWidth: 120 }} className='ext-sm text-primary-500 hover:text-black rounded-3xl font-semibold w-1/3 h-10  flex items-center justify-center transition-colors '>VIEW MORE</span>
      </button>
    </li>
  )
}
