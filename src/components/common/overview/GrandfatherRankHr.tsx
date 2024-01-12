import axios from 'axios'
import { getLocalStorage } from 'lib/utils/localStorage'
import { useEffect, useState } from 'react'

export const GrandfatherRankHr = ({ containerStyles, textStyles }) => {
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
    <div className={` text-center h-fit flex justify-center items-center ${containerStyles}`}>
      <span className='text-xs lg:text-sm' >Grandfathered Pay Rank: <br/><span className={`${textStyles}`}>{data.gRankUpperCase}</span> until <span className='font-bold text-lg text-[#E74426]'>{data.till}</span></span>
    </div>
  )
}
