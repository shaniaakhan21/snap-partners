export type TTrainingType = 'all' | 'start' | 'customer' | 'driver' | 'merchant' | 'empire'

export interface ITraining {
  title: string
  subtitle: string
  caption: string
  url: string
  type: TTrainingType
  order: number
}

// export interface ITrainingState {
//   all: {
//     data: ITraining[],
//     page: number
//   }
//   start: {
//     data: ITraining[],
//     page: number
//   }
//   customer: {
//     data: ITraining[],
//     page: number
//   }
//   driver: {
//     data: ITraining[],
//     page: number
//   }
//   merchant: {
//     data: ITraining[],
//     page: number
//   }
//   empire: {
//     data: ITraining[],
//     page: number
//   }
// }

export interface ITrainingState {
  all: ITraining[],
  start: ITraining[],
  customer: ITraining[],
  driver: ITraining[],
  merchant: ITraining[],
  empire: ITraining[],
}
