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

  if(data === undefined) return (<></>)

  return (
    <div className='w-full h-full mt-7 mb-7 px-6 py-3 flex justify-between items-center max-w-7xl mx-auto' style={{ backgroundColor: 'white' }}>
      <span className='text-lg'>Grandfathered Pay Rank: <span className='font-semibold text-lg'>{data.gRankUpperCase}</span> until {data.till}</span>
    </div>
  )
}
