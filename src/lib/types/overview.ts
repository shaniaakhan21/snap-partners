export interface ITopEntity {
  name: string
  amount: number
}

export interface IReport {
  totalEarnings: number
  totalOrders: number
  estimatedCommissions: number
  myOrders: number
  payRank: number
  topUsers: {
    topMerchant: ITopEntity[]
    topCustomer: ITopEntity[]
    topDriver: ITopEntity[]
  }
}
