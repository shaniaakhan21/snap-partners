export interface SetcClient {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  createdAt: string;
  paid_status: number;
  filingCompleted: boolean
}

export interface LevelledSetcClient{
  level: number;
  ibos: (SetcClient &{clients: SetcClient[]})[]
}
