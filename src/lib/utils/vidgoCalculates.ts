import { IReport } from 'lib/types'

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
  default: {
    retention: 0,
    directBonus: 0
  }
}

const getRetentionBonuxBenchmarked = (totalActiveCount: number): { retention: number, directBonus: number } => {
  if (totalActiveCount >= RETENTION_BONUS_BENCHMARKS.get5.min && totalActiveCount < RETENTION_BONUS_BENCHMARKS.get5.max) {
    return {
      retention: RETENTION_BONUS_BENCHMARKS.get5.retention,
      directBonus: RETENTION_BONUS_BENCHMARKS.get5.directBonus
    }
  }

  if (totalActiveCount >= RETENTION_BONUS_BENCHMARKS.get10.min && totalActiveCount < RETENTION_BONUS_BENCHMARKS.get10.max) {
    return {
      retention: RETENTION_BONUS_BENCHMARKS.get10.retention,
      directBonus: RETENTION_BONUS_BENCHMARKS.get10.directBonus
    }
  }

  if (totalActiveCount >= RETENTION_BONUS_BENCHMARKS.get20.min && totalActiveCount < RETENTION_BONUS_BENCHMARKS.get20.max) {
    return {
      retention: RETENTION_BONUS_BENCHMARKS.get20.retention,
      directBonus: RETENTION_BONUS_BENCHMARKS.get20.directBonus
    }
  }

  return RETENTION_BONUS_BENCHMARKS.default
}

export const getVidgoCalculates = (reports: IReport): IActivePaymentsReturn => {
  const data = {
    month1: reports.month1.map(report => report.status === 'Active'),
    month2: reports.month2.map(report => report.status === 'Active'),
    month3: reports.month3.map(report => report.status === 'Active'),
    month6: reports.month6.map(report => report.status === 'Active'),
    month12: reports.month12.map(report => report.status === 'Active')
  }

  const totalActiveCount = {
    month1: data.month1.filter(Boolean).length,
    month2: data.month2.filter(Boolean).length,
    month3: data.month3.filter(Boolean).length,
    month6: data.month6.filter(Boolean).length,
    month12: data.month12.filter(Boolean).length
  }

  const eligibleBenchmarkFull = {
    month1: getRetentionBonuxBenchmarked(totalActiveCount.month1),
    month2: getRetentionBonuxBenchmarked(totalActiveCount.month2),
    month3: getRetentionBonuxBenchmarked(totalActiveCount.month3),
    month6: getRetentionBonuxBenchmarked(totalActiveCount.month6),
    month12: getRetentionBonuxBenchmarked(totalActiveCount.month12)
  }

  const eligibleBenchmark = {
    month1: eligibleBenchmarkFull.month1.retention,
    month2: eligibleBenchmarkFull.month2.retention,
    month3: eligibleBenchmarkFull.month3.retention,
    month6: eligibleBenchmarkFull.month6.retention,
    month12: eligibleBenchmarkFull.month12.retention
  }

  const payOfTotal = WEIGHTTED_PAYOUT_SCALE

  const commission = {
    month1: (payOfTotal.month1 / 100) * eligibleBenchmarkFull.month1.directBonus,
    month2: (payOfTotal.month2 / 100) * eligibleBenchmarkFull.month2.directBonus,
    month3: (payOfTotal.month3 / 100) * eligibleBenchmarkFull.month3.directBonus,
    month6: (payOfTotal.month6 / 100) * eligibleBenchmarkFull.month6.directBonus,
    month12: (payOfTotal.month12 / 100) * eligibleBenchmarkFull.month12.directBonus
  }

  return {
    totalActiveCount,
    eligibleBenchmark,
    payOfTotal,
    commission
  }
}

export const monthGenerator = (date: Date) => {
  const addMonths = (month, quantity) => {
    const monthToReturn = new Date(month.getTime())
    monthToReturn.setMonth(monthToReturn.getMonth() + quantity)

    return {
      month: monthToReturn.getMonth() + 1,
      year: monthToReturn.getFullYear()
    }
  }

  return {
    month1: addMonths(date, 0),
    month2: addMonths(date, 1),
    month3: addMonths(date, 2),
    month6: addMonths(date, 5),
    month12: addMonths(date, 11)
  }
}

export const getActivePayments = (reports: IReport) => {
  const data = {}

  const getData = (month) => {
    reports[month].forEach((report) => {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(report.name)) {
        data[report.name].push(report?.status === 'Active')
        return
      }

      data[report.name] = [
        report.name,
        report?.status === 'Active'
      ]
    })
  }

  getData('month1')
  getData('month2')
  getData('month3')
  getData('month6')
  getData('month12')

  console.log('getActivePayments data', data)

  return data
}
