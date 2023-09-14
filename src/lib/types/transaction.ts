export interface ITransaction {
  createdAt: string;
  id: number;
  state: number;
  type: number;
  description: string;
  amount: number;
  userId: number;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    lastname: string;
  };
  date: string;
  time: string;
}

export interface Client {
  phase: number;
  email: string;
  client: number;
  companyName: string;
  phone: string;
  aggrementSigned: boolean;
  depositPaid: string;
  docsCollected: string;
  excelTeam: string;
  docSentForSignature: string;
  docForSignatureReturned: string;
  quarters: {quarter: string, year: string}[];
  signupDate: string
}

export interface LevelledClient {
  level: number;
  ibos: {
    id: number;
    name: string;
    lastname: string;
    clients: Client[];
  }[]
}

export interface ClientTableProps {
  clients: Client[];
  totalClientCount: number
  toggleModal: (toggle: boolean) => void;
}

export interface TeamClientsTableProps {
  clients: LevelledClient[];
  onSelectLevel: (level: number) => unknown
  // toggleTable: (toggle: boolean) => void;
}

export interface TableHeaderProps {
  tableName: string;
  loading?:boolean;
  setYearSelected: (prop: number) => void;
  setMonthSelected: (prop: number) => void;
}
