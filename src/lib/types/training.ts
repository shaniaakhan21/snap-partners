/* eslint-disable no-multi-spaces */
export type TTrainingType = 'all' | 'start' | 'customer' | 'driver' | 'merchant' | 'empire' | null

export interface ITraining {
  title: string
  subtitle: string
  caption: string
  url: string
  type: TTrainingType
  order: number
}

export interface ITrainingState {
  all: ITraining[] | [] | null
  start: ITraining[] | [] | null
  customer: ITraining[] | [] | null
  driver:   ITraining[] | [] | null
  merchant: ITraining[] | [] | null
  empire:   ITraining[] | [] | null
}
