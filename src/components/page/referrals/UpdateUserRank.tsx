import { updateUserRank } from 'lib/services/user/updateUserRank'
import { TRANK } from 'lib/types/user/ranks'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export const UpdateUserRank = ({ id, rank, authToken }: { id: number, rank: TRANK, authToken: string }) => {
  const { handleSubmit, register } = useForm<{ rankToUpdate: TRANK }>()
  const [disableUpdateRank, setDisableUpdateRank] = useState(true)
  const [, setIsLoading] = useState(false)

  const onSubmit = async ({ rankToUpdate }: { rankToUpdate: TRANK }) => {
    setIsLoading(true)
    setDisableUpdateRank(true)

    if (!rankToUpdate) {
      toast('Rank no aviable', { type: 'error' })
      setIsLoading(false)
      setDisableUpdateRank(true)
    }

    // console.log('UserDetailModal - rankToUpdate => /api/rank/update', {
    //   userId: id,
    //   rank: rankToUpdate
    // })

    const { error } = await updateUserRank(id, rankToUpdate, authToken)

    if (error) {
      handleFetchError(error.status, error.info)
      setDisableUpdateRank(false)
      setIsLoading(false)
      toast('Error to update rank user', { type: 'error' })
    }

    setDisableUpdateRank(true)
    setIsLoading(false)
    toast('User Rank Updated', { type: 'success' })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
      <label
        className='font-bold text-primary-500 uppercase'
        htmlFor='civilState'
      >
        Update Rank
      </label>

      <div className='flex flex-col xs:flex-row justify-start xs:items-center'>
        <select
          id='rankToUpdate'
          name='rankToUpdate'
          className='cursor-pointer relative block xs:mr-2 pl-2 pr-10 py-0 xs:py-1 my-2 bg-[rgba(255,255,255,.13)] rounded-md border border-solid border-black outline-none appearance-none leading-8'
          placeholder='User Rank'
          {...register('rankToUpdate')}
          onChange={() => setDisableUpdateRank(false)}
        >
          <>
            <option disabled selected>Select Rank</option>
            <option className='text-black' value='referralPartner'>Referral Partner</option>
            <option className='text-black' value='manager'>Manager</option>
            <option className='text-black' value='supervisor'>Supervisor</option>
            <option className='text-black' value='director'>Director</option>
            <option className='text-black' value='executive'>Executive Director</option>
          </>
        </select>

        <button
          disabled={disableUpdateRank}
          className='disabled:bg-gray-400 disabled:hover:opacity-100 select-none px-4 py-2 xs:py-2.5 bg-primary-500 rounded-md hover:opacity-90 text-white font-semibold focus:outline-none focus:ring focus:ring-primary-300'
        >
          Update
        </button>
      </div>
    </form>
  )
}
