interface IActivePayments {
  customerName: string
  month1: boolean
  month2: boolean
  month3: boolean
  month6: boolean
  month12: boolean
}

interface ITableRow {
  month1: number,
  month2: number,
  month3: number,
  month6: number,
  month12: number
}

interface IActivePaymentsReturn {
  totalActiveCount: ITableRow
  eligibleBenchmark: ITableRow
  payOfTotal: ITableRow
  commission: ITableRow
}

const WEIGHTTED_PAYOUT_SCALE = {
  month1: 10,
  month2: 10,
  month3: 10,
  month6: 20,
  month12: 50
}

const RETENTION_BONUS_BENCHMARKS = {
  get5: {
    min: 5,
    max: 9,
    retention: 5,
    directBonus: 500
  },
  get10: {
    min: 10,
    max: 19,
    retention: 10,
    directBonus: 3000
  },
  get20: {
    min: 20,
    max: null,
    retention: 20,
    directBonus: 10000
  },
  default: 0
}

const getRetentionBonuxBenchmarked = (totalActiveCount: number): number => {
  if (totalActiveCount >= RETENTION_BONUS_BENCHMARKS.get5.min && totalActiveCount < RETENTION_BONUS_BENCHMARKS.get5.max) {
    return RETENTION_BONUS_BENCHMARKS.get5.directBonus
  }
  if (totalActiveCount >= RETENTION_BONUS_BENCHMARKS.get10.min && totalActiveCount < RETENTION_BONUS_BENCHMARKS.get10.max) {
    return RETENTION_BONUS_BENCHMARKS.get10.directBonus
  }
  if (totalActiveCount >= RETENTION_BONUS_BENCHMARKS.get20.min && totalActiveCount < RETENTION_BONUS_BENCHMARKS.get20.max) {
    return RETENTION_BONUS_BENCHMARKS.get20.directBonus
  }
  return RETENTION_BONUS_BENCHMARKS.default
}

export const getVidgoCalculates = (data: IActivePayments[]): IActivePaymentsReturn => {
  const initReduce = { month1: 0, month2: 0, month3: 0, month6: 0, month12: 0 }
  const totalActiveCount = data.reduce((prev, curr) => {
    return {
      month1: (+prev.month1) + (+curr.month1),
      month2: (+prev.month2) + (+curr.month2),
      month3: (+prev.month3) + (+curr.month3),
      month6: (+prev.month6) + (+curr.month6),
      month12: (+prev.month12) + (+curr.month12)
    }
  }, initReduce)

  const eligibleBenchmark = {
    month1: getRetentionBonuxBenchmarked(totalActiveCount.month1),
    month2: getRetentionBonuxBenchmarked(totalActiveCount.month2),
    month3: getRetentionBonuxBenchmarked(totalActiveCount.month3),
    month6: getRetentionBonuxBenchmarked(totalActiveCount.month6),
    month12: getRetentionBonuxBenchmarked(totalActiveCount.month12)
  }

  const payOfTotal = WEIGHTTED_PAYOUT_SCALE

  const commission = {
    month1: payOfTotal.month1 * eligibleBenchmark.month1,
    month2: payOfTotal.month2 * eligibleBenchmark.month2,
    month3: payOfTotal.month3 * eligibleBenchmark.month3,
    month6: payOfTotal.month6 * eligibleBenchmark.month6,
    month12: payOfTotal.month12 * eligibleBenchmark.month12
  }

  return {
    totalActiveCount,
    eligibleBenchmark,
    payOfTotal,
    commission
  }
}
