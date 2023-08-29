import { FC, useState } from 'react'
interface CommissionDetailsProps {
  commissionID: string;
  nextWeeklyPayRun: string;
  nextMonthlyPayRun: string;
  rank: string;
  gfrank: string;
}

const CommissionDetails: FC<CommissionDetailsProps> = ({
  commissionID,
  nextWeeklyPayRun,
  nextMonthlyPayRun,
  rank,
  gfrank
}) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className='flex flex-col lg:flex-row text-sm justify-between mt-4 p-4 bg-zinc-100'>
      <div>
        <div>
          <ul>
            <li>From Business Name</li>
            <li>Business Address</li>
            <li>+1 555 5555 555</li>
            <li>email@email.com</li>
          </ul>
        </div>
        <div className='flex flex-row justify-between mb-3 mt-5 w-full'>
          <label className='w-2/4 lg:w-8/12'>Commission ID</label>
          <input
            className='w-2/4 lg:w-2/5 font-bold bg-zinc-100 align-end'
            type="text"
            value={commissionID}
            readOnly={!isEditing}
          />
        </div>
        <div className='flex flex-row justify-between mb-3'>
          <label>Next Weekly Pay Run</label>
          <input
            type="text"
            value={nextWeeklyPayRun}
            readOnly={!isEditing}
            className='font-bold bg-zinc-100 align-end lg:align-center'
          />
        </div>
        <div className='flex flex-row justify-between'>
          <label>Next Monthly Pay Run</label>
          <input
            type="text"
            value={nextMonthlyPayRun}
            readOnly={!isEditing}
            className='font-bold bg-zinc-100 align-end lg:align-center'
          />
        </div>
      </div>

      <div className='mt-3'>
        <div className='align-end lg:align-end'>
          <i className="fa fa-pencil mr-2 text-gray-400 text-xs" aria-hidden="true"></i>
          <span className='uppercase red-text text-sm font-bold'>Edit My Details</span>
        </div>
        <div className='align-end lg:align-end'>
          <ul>
            <li className='mb-1'>Ana Parra Coll</li>
            <li className='mb-1'>D’pero  23 1-2 Pichincha</li>
            <li className='mb-1'>08718</li>
            <li className='mb-1'>USA</li>
          </ul>
        </div>
        <div className='flex flex-row justify-between mt-6'>
          <label>Rank</label>
          <input
            type="text"
            value={rank}
            readOnly={!isEditing}
            className='font-bold bg-zinc-100 align-end'
          />
        </div>
        <div className='flex flex-row justify-between mt-2'>
          <label>GF Rank</label>
          <input
            type="text"
            value={gfrank}
            readOnly={!isEditing}
            className='font-bold bg-zinc-100 align-end'
          />
        </div>
      </div>
    </div>
  )
}

export default CommissionDetails
