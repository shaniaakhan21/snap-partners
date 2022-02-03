export const ReferralListSelectedItemMobile = ({ userId, userName, numUsers, onClick }) => {
  return (
    <li className='mb-4 last:mb-0'>
      <button
        className='w-full h-16 text-xs sm:text-sm flex items-center justify-between transition-colors hover:bg-gray-200 md:px-2'
        onClick={() => onClick(userId)}
      >
        <span className='font-bold text-gray-800 w-2/6 text-center truncate'>{userName.toUpperCase()}</span>

        <span className='text-primary-500 w-2/6 text-center truncate'>ID: {userId}</span>

        <span style={{ maxWidth: 120 }} className='w-2/6 h-10 bg-primary-500 rounded-3xl font-bold text-white cursor-pointer flex items-center justify-center transition-colors hover:bg-hoverPrimary'>VIEW MORE</span>
      </button>
    </li>
  )
}
