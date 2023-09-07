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

export interface ClientTableProps {
  clients: Client[];
  totalClientCount: number
  toggleModal: (toggle: boolean) => void;
  onPageChange: (newPage:number) => void
}

export interface ITable2TransactionsProps {
  transactions: ITransaction[];
  toggleTable: (toggle: boolean) => void;
}

export interface TableHeaderProps {
  tableName: string;
  setYearSelected: (prop: number) => void;
  setMonthSelected: (prop: number) => void;
}
