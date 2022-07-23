export interface IVidgoReportMonthly {
  accountUID: string
  subID: string
  name: string
  UID: string | null,
  zip: string
  city: string
  state: string
  partner: string
  partnerAgentId: string
  package: string
  joinDate: string
  paymentDate: string
  days: string
  start: string
  end: string
  invoice: string
  subtotal: string
  tax: string
  discount: string
  total: string
  status: string
  createdAt: string
  updatedAt: string
  month: number
  year: number
}

export interface IReport {
  month1: IVidgoReportMonthly[],
  month2: IVidgoReportMonthly[],
  month3: IVidgoReportMonthly[],
  month6: IVidgoReportMonthly[],
  month12: IVidgoReportMonthly[]
}
