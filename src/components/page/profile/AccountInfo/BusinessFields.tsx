import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { IAuth } from 'lib/stores/Auth'

interface IBusinessFieldsProps {
  auth: IAuth
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

export const BusinessFields = ({ auth, setTypeUpdate }: IBusinessFieldsProps) => {
  return (
    <div >
      <ul className='w-full h-full rounded-lg '>
        <div className='flex flex-col sm:flex-row justify-start items-start gap-y-2 gap-x-2'>
          <li className='rounded-xl bg-[#E05E4B] text-white w-full sm:w-1/2 px-4 py-3 border-y-2 border-y-gray-200 flex justify-between items-center'>
            <div className='w-full'>
              <label htmlFor='name' className='text-sm font-bold'>Business Name</label>
              <br />
              <input
                id='businessName'
                name='businessName'
                type='text'
                value={auth.businessName ?? ''}
                disabled={true}
                className='w-full bg-transparent text-lg'
              />
            </div>
          </li>

          <li className='rounded-xl bg-[#E05E4B] text-white w-full sm:w-1/2 px-4 py-3 border-y-2 border-y-gray-200 flex justify-between items-center'>
            <div className='w-full'>
              <label htmlFor='business_type' className='text-sm font-bold'>Business Type</label>
              <br />
              <input
                id='business_type'
                name='business_type'
                type='text'
                value={auth.business_type ?? ''}
                disabled={true}
                className='w-full bg-transparent text-lg truncate'
              />
            </div>
          </li>
        </div>
        <div className='flex flex-col sm:flex-row justify-start items-start gap-y-2 gap-x-2'>
          <li className='rounded-xl bg-[#E05E4B] text-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center w-1/2'>
            <div>
              <label htmlFor='ein' className='text-sm font-bold'>EIN</label>
              <br />
              <input
                id='ein'
                name='ein'
                type='text'
                value={auth.ein}
                disabled={true}
                className='w-full bg-transparent text-lg truncate'
              />
            </div>
          </li>
          <li className='rounded-xl w-1/2 bg-[#E05E4B] text-white px-4 py-3 mt-2 border-y-2 border-y-gray-200 flex justify-between items-center'>
            <div>
              <label htmlFor='b_start_date' className='text-sm font-bold'>Business Start Date</label>
              <br />
              <input
                id='b_start_date'
                name='b_start_date'
                type='text'
                value={
                  auth.b_start_date
                    ? new Date(auth.b_start_date).toLocaleDateString()
                    : ''
                }
                disabled={true}
                className='w-full bg-transparent text-lg truncate'
              />
            </div>
          </li>
        </div>
      </ul>
    </div>
  )
}
