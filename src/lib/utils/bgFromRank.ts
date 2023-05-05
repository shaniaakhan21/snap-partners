import { Rank } from 'lib/types/overview'
export const bgFromRank = (rank: Rank): string => {
  switch (rank) {
  case 'Free Member': {
    return '#E35C49'
  }
  case 'Manager': {
    return '#C99FFF'
  }
  case 'Supervisor': {
    return '#54A52C'
  }
  case 'Director': {
    return '#F18A00'
  }
  case 'Executive': {
    return '#000000'
  }
  default:
    return '#E35C49'
  }
}
