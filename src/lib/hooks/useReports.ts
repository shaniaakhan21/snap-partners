import { useEffect, useState } from 'react'

import { handleFetchError } from 'lib/utils/handleFetchError'
import { useAuthStore } from 'lib/stores'
import { getReports } from 'lib/services/reports/getReports'
import { IReport } from 'lib/types/overview'

export const useReports = () => {
  const { auth } = useAuthStore()
  const [loading, setIsLoading] = useState(false)
  const [reports, setReportsData] = useState<IReport>({
    estimatedCommissions: 0,
    myOrders: 0,
    payRank: 0,
    totalEarnings: 0,
    totalOrders: 0,
    topUsers: {
      topCustomer: [],
      topDriver: [],
      topMerchant: [],
      topAgent: []
    }
  })
  const [dataGraphic] = ([
    {
      name: '1a',
      pv: 0
    },
    {
      name: '6m',
      pv: 0
    },
    {
      name: '1m',
      pv: 0
    },
    {
      name: '1s',
      pv: 0
    },
    {
      name: '1d',
      pv: 0
    }
  ])

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

  return { reports, dataGraphic, loading }
}
