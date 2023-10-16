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
    topAgent: ITopEntity[]
  }
}

export type Rank = 'Free Member' | 'Manager' | 'Supervisor'| 'Director' | 'Executive'
export interface WorkingLegs {
  [key: string]: {
    rate: number;
    percentage: number;
    name: string
  };
}
export interface GV {
  value: number,
  percentage: number
}
export interface PVC {
  value: number,
  percentage: number
}
export interface Post {
  pvc: PVC
  commissionVol: number,
  PSMRatio: string,
  PSMPercentage: number,
  workingLegs: WorkingLegs,
  gv: GV
}
export interface RankData {
  currentRank: string,
  currentRankLevel: number,
  mng: Post,
  sv: Post,
  dct: Post,
  exec: Post
}
