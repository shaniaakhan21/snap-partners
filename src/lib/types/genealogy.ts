export interface ILevelUser {
  id: number
  name: string
  email: string
  phoneNumber: string
  sponsorId: number | null
}

export interface ILevel {
  level: number,
  usersLength: number,
  users: [] | ILevelUser[]
}

export interface IUserSelectedLevels extends ILevelUser {
  levels: ILevel[]
}
