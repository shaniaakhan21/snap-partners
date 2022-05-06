export interface ITopEntity {
  createdAt: string
  id: number
  name: string
  lastname: string
  email: string
  username: string
  phoneNumber: string
  roles: {
    admin: boolean
    customer: boolean
    driver: boolean
    merchant: boolean
  },
  isManager: boolean
  ownerName: string
  nsurUserId: number
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
