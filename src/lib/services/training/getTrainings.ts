import { IQueryErrorReturn } from 'lib/types/http/query'
import { ITraining, TTrainingType } from 'lib/types/training'

interface IQueryArticlesReturn extends IQueryErrorReturn {
  data: ITraining[] | [] | null
}

export const getTrainings = async (token: string, type: TTrainingType = null, page: number): Promise<IQueryArticlesReturn> => {
  const res = await fetch(`/api/training?page=${page}&limit=3${type ? `&type=${type}` : ''}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  })

  const data = await res.json()

  if (!res.ok) {
    return {
      data: null,
      error: {
        info: data.error,
        status: res.status
      }
    }
  }

  return {
    data: data.data,
    error: null
  }
}
