import { IUserData } from './user'

export interface SetcClient {
  id: number;
  orderDate: string;
  name: string;
  email: string;
  phone: string;
  paidDate: string;
  sentDate: string;
  DNP: string;
  paidAmount: number;
  irsFiledDate: string
  agreementSignedDate: string;
  taxpayerQualified2020: boolean;
  taxpayerQualified2021: boolean;
  childCareQualified2020: boolean;
  childCareQualified2021: boolean;
  caregiverQualified2020: boolean;
  caregiverQualified2021: boolean;
  phase: number;
  isPersonalClient: boolean
  current_status: string;
  current_department: string;
  unresponsive_note: any;
}

export interface LevelledSetcClient{
  level: number;
  ibos: (IUserData & {clients: SetcClient[]})[]
}
