import { getTrainings } from 'lib/services/training/getTrainings'
import { ITrainingState, TTrainingType } from 'lib/types/training'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { useEffect, useState } from 'react'

export const useTrainingData = (token: string) => {
  const [data, setData] = useState<ITrainingState>({
    all: null,
    start: null,
    customer: null,
    driver: null,
    merchant: null,
    empire: null
  })
  const [type, setType] = useState<TTrainingType>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (data[type]) return

    (async () => {
      if (!isLoading) setIsLoading(true)
      const { data, error } = await getTrainings(token, type === 'all' ? null : type)

      if (error) {
        handleFetchError(error.status, error.info)
        setIsLoading(false)
        return
      }

      setData(prevState => ({
        ...prevState,
        [type]: data
      }))
      setIsLoading(false)
    })()
  }, [type])

  return {
    data,
    isLoading,
    category: type,
    setCategory: setType
  }
}
