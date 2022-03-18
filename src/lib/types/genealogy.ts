export interface ILevelUser {
  id: number
  name: string
  email: string
  phoneNumber: string
  sponsorId: number | null
}

// * ILEVELUSER Y IUSERBYSEARCH SON IGUALES

// export interface IUserBySearch {
//   id: number
//   name: string
//   phoneNumber: string
//   sponsorId: string | null
// }

export interface ILevel {
  level: number,
  usersLength: number,
  users: [] | ILevelUser[]
}

export interface IUserSelectedLevels extends ILevelUser {
  levels: ILevel[]
}
