import { IUserData } from './user'

export interface SetcClient {
  id: number;
  orderDate: string;
  name: string;
  email: string;
  phone: string;
  paidStatus: boolean;
  paidAmount: number;
  irsFiledDate: string
}

export interface LevelledSetcClient{
  level: number;
  ibos: (IUserData & {clients: SetcClient[]})[]
}
