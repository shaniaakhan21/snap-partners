import axios from 'axios'
import { getLocalStorage } from 'lib/utils/localStorage'
import { useEffect, useState } from 'react'

export const GrandfatherRankHr = () => {
  const [data, setData] = useState(undefined)

  useEffect(() => {
    (async () => {
      try {
        const token = getLocalStorage('accessToken')
        const response = await axios.get('/api/user/get-user-gRank', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setData(response.data)
      } catch (e) {

      }
    })()
  }, [])

  if (data === undefined) return (<></>)

  return (
    <div className='w-9/12 text-center rounded-lg bg-white border-2 border-[#E74426] h-fit mx-4 mt-4 mb-7  px-2 py-1 flex justify-center items-center'>
      <span className='text-xs lg:text-sm'>Grandfathered Pay Rank: <br/><span className='font-semibold text-sm lg:text-lg text-[#E74426]'>{data.gRankUpperCase}</span> until <span className='font-semibold text-lg text-[#E74426]'>{data.till}</span></span>
    </div>
  )
}
