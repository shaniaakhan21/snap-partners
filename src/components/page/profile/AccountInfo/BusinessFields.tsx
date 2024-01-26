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
        <div className='flex flex-col justify-start items-start gap-y-2 gap-x-2'>
          <li className='rounded-xl bg-[#F5F9FD] text-[#E05E4B] w-full px-4 py-3 border-2 border-[#E5EDF3] flex justify-between items-center'>
            <div className='w-full'>
              <label htmlFor='name' className='text-sm font-bold text-[#3A4B59]'>Business Name</label>
              <br />
              <input
                id='businessName'
                name='businessName'
                type='text'
                value={auth.businessName ?? ''}
                disabled={true}
                className='w-full bg-transparent text-sm md:text-lg'
              />
            </div>
          </li>

          <li className='rounded-xl bg-[#F5F9FD] text-[#E05E4B]  w-full px-4 py-3 border-[#E5EDF3] border-2 flex justify-between items-center'>
            <div className='w-full'>
              <label htmlFor='business_type' className='text-sm font-bold text-[#3A4B59]'>Business Type</label>
              <br />
              <input
                id='business_type'
                name='business_type'
                type='text'
                value={auth.business_type ?? ''}
                disabled={true}
                className='w-full bg-transparent  text-sm md:text-lg truncate'
              />
            </div>
          </li>
        </div>
        <div className='flex flex-col justify-start items-start gap-y-2 gap-x-2'>
          <li className='rounded-xl bg-[#F5F9FD] text-[#E05E4B]  px-4 py-3 mt-2 border-[#E5EDF3] border-2 flex justify-between items-center w-full'>
            <div>
              <label htmlFor='ein' className='text-sm font-bold text-[#3A4B59]'>EIN</label>
              <br />
              <input
                id='ein'
                name='ein'
                type='text'
                value={auth.ein}
                disabled={true}
                className='w-full bg-transparent  text-sm md:text-lg truncate'
              />
            </div>
          </li>
          <li className='rounded-xl bg-[#F5F9FD] text-[#E05E4B]  px-4 py-3 mt-2 border-[#E5EDF3] border-2 flex justify-between items-center w-full'>
            <div>
              <label htmlFor='b_start_date' className='text-sm font-bold text-[#3A4B59]'>Business Start Date</label>
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
                className='w-full bg-transparent  text-sm md:text-lg truncate'
              />
            </div>
          </li>
        </div>
      </ul>
    </div>
  )
}
