export interface IQueryErrorReturn {
  error: {
    status: number,
    info: string
  } | null | undefined
}