export interface ILevelUser {
  id: number
  name: string
  lastname: string
  email: string
  phoneNumber: string
  sponsorId: number
}

export interface ILevel {
  level: number,
  usersLength: number,
  users: [] | ILevelUser[]
}

export interface IUserSelectedLevels extends ILevelUser {
  levels: ILevel[]
}
