import { useEffect, useState } from 'react'

import { handleFetchError } from 'lib/utils/handleFetchError'
import { useAuthStore } from 'lib/stores'
import { getReports } from 'lib/services/reports/getReports'
import { IReport } from 'lib/types/overview'

export const useReports = () => {
  const { auth } = useAuthStore()
  const [loading, setIsLoading] = useState(false)
  const [reports, setReportsData] = useState<IReport>({
    estimatedCommissions: '-',
    myOrders: '-',
    payRank: '-',
    topCustomer: '-',
    topDriver: '-',
    topMerchants: '-',
    topRestaurant: '-',
    totalEarnings: '-',
    totalOrders: '-'
  })

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const { data, error } = await getReports(auth.accessToken)

      if (error) {
        handleFetchError(error.status, error.info)
        setIsLoading(false)
      }

      setReportsData(data)
      setIsLoading(false)
    })()
  }, [])

  return { reports, loading }
}
