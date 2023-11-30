import { IUserData } from './user'

export interface SetcClient {
  id: number;
  orderDate: string;
  name: string;
  email: string;
  phone: string;
  paidDate: string;
  paidAmount: number;
  irsFiledDate: string
  agreementSignedDate: string;
  taxpayerQualified2020: boolean;
  taxpayerQualified2021: boolean;
  childCareQualified2020: boolean;
  childCareQualified2021: boolean;
  caregiverQualified2020: boolean;
  caregiverQualified2021: boolean;
}

export interface LevelledSetcClient{
  level: number;
  ibos: (IUserData & {clients: SetcClient[]})[]
}
