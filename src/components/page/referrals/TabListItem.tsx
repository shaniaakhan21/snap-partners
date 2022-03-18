// import { EyeVisibleIcon } from 'components/common/icons'

interface IProps {
  isSelect?: boolean
  id: string
  newUsers: number
  numUsers: number
  noCursor?: boolean
  onClick?: (id?: string) => void
}

export const ReferralTabListItem = ({ isSelect = false, id, newUsers, numUsers, noCursor = false, onClick = () => {} }: IProps) => {
  return (
    <li className={`bg-white rounded-sm relative mb-4 h-24 list-none last:mb-0 ${noCursor ? '' : 'shadow'}`}>
      {isSelect && <div style={{ top: '30px' }} className='absolute left-2 rounded-full bg-primary-500 w-2 h-2' />}
      <button
        style={{ cursor: noCursor ? 'auto' : 'pointer' }}
        className={`border border-transparent rounded-sm w-full h-full py-2 pl-5 pr-2 text-sm text-left ${noCursor ? '' : 'transition-colors hover:border-primary-500'}`}
        onClick={() => onClick(id)}
      >
        <div className='flex items-center justify-between'>
          <span className='text-textAcent-500'>Level {id}</span>
          {/* <div className='flex items-center justify-center'>
            <EyeVisibleIcon classes='w-5 h-5 fill-[#777777]' />
            <span className='text-textAcent-500 ml-1'>See income</span>
          </div> */}
        </div>

        {/* <span className='block my-1'>{numUsers} Users</span> */}

        {/* <span className={`block ${newUsers > 0 ? 'text-success-500' : ''}`}>{newUsers} New Users</span> */}
      </button>
    </li>
  )
}
