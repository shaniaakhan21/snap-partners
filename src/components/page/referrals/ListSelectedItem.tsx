import { AdjuntIcon } from 'components/common/icons'

export const ReferralListSelectedItem = ({ userId, userName, numUsers, onClick }) => {
  // Button
  return (
    <li className='mb-4 last:mb-0'>
      <button className='w-full h-16 flex items-center justify-between transition-colors lg:px-2 hover:bg-gray-200' onClick={() => onClick(userId)}>
        <span className='font-bold w-1/4 truncate text-sm text-left text-gray-800 mx-auto'>{userName.toUpperCase()}</span>

        <span className='w-1/4 truncate text-sm text-center'>{numUsers} users</span>

        <div className='inline-flex items-center justify-center w-1/4'>
          <AdjuntIcon classes='w-5 h-5' />
          <span className='ml-1 text-textAcent-500 text-sm truncate'>ID: {userId}</span>
        </div>

        <span style={{ maxWidth: 120 }} className='bg-primary-500 text-sm text-white rounded-3xl font-bold w-1/4 h-10 border border-primary-500 flex items-center justify-center transition-colors hover:bg-hoverPrimary-500'>VIEW MORE</span>
      </button>
    </li>
  )
}
