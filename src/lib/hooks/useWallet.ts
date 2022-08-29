import { useEffect, useState } from 'react'

import { getWallet } from 'lib/services/wallet/getUserWallet'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { useAuthStore } from 'lib/stores'
import { ITransaction } from 'lib/types/transaction'

export const useWallet = () => {
  const { auth } = useAuthStore()
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [loading, setIsLoading] = useState(false)

  const refresh = async () => {
    setIsLoading(true)
    const { data, error } = await getWallet(auth.accessToken, auth.id, 1)

    if (error) {
      handleFetchError(error.status, error.info)
      setIsLoading(false)
    }

    setTransactions([...data])
    setIsLoading(false)
  }

  useEffect(() => {
    (async () => {
      await refresh()
    })()
  }, [])

  return { transactions, loading, refresh }
}
