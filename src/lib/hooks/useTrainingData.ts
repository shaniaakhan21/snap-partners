import { useEffect, useState } from 'react'
import { getTrainings } from 'lib/services/training/getTrainings'
import { ITrainingState, TTrainingType } from 'lib/types/training'
import { handleFetchError } from 'lib/utils/handleFetchError'

const fnGetTrainings = async (token: string, type: TTrainingType, page: number) => {
  const { data, error } = await getTrainings(token, type, page)

  if (error) handleFetchError(error.status, error.info)

  return { data, error }
}

export const useTrainingData = (token: string) => {
  const [pages, setPages] = useState({
    all: 1,
    start: 1,
    customer: 1,
    driver: 1,
    merchant: 1,
    empire: 1
  })

  const [trainings, setTrainings] = useState<ITrainingState>({
    all: null,
    start: null,
    customer: null,
    driver: null,
    merchant: null,
    empire: null
  })

  const [type, setType] = useState<TTrainingType>('all')
  const [isFetchLoading, setIsFetchLoading] = useState(true)
  const [isNearScreenLoading, setIsNearScreenLoading] = useState(false)

  useEffect(() => {
    if (trainings[type]) return

    (async () => {
      if (!isFetchLoading) setIsFetchLoading(true)
      const { data, error } = await fnGetTrainings(
        token,
        type === 'all' ? null : type,
        pages[type]
      )

      if (error) {
        setIsFetchLoading(false)
        return
      }

      setTrainings(prevState => ({
        ...prevState,
        [type]: data
      }))
      setIsFetchLoading(false)
    })()
  }, [type])

  useEffect(() => {
    if (!pages[type] || pages[type] === 1) return // * NO INIT DATA

    (async () => {
      setIsNearScreenLoading(true)
      const { data, error } = await fnGetTrainings(
        token,
        type === 'all' ? null : type,
        pages[type]
      )

      if (error) {
        setIsNearScreenLoading(false)
        return
      }

      if (data.length === 0) { // NO MORE DATA
        setPages(prevState => ({
          ...prevState,
          [type]: null
        }))
        setIsNearScreenLoading(false)
        return
      }

      setTrainings(prevState => ({
        ...prevState,
        [type]: [...prevState[type], ...data]
      }))
      setIsNearScreenLoading(false)
    })()
  }, [pages])

  return {
    trainings,
    isFetchLoading,
    isNearScreenLoading,
    category: type,
    setCategory: (newCategory: TTrainingType) => {
      if (newCategory === type) return

      setType(newCategory)
    },
    increasePage: () => {
      if (!pages[type]) return

      setPages(prevState => ({
        ...prevState,
        [type]: prevState[type] + 1
      }))
    }
  }
}
