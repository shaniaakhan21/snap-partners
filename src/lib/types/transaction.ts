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

export interface ITableTransactionsProps {
  transactions: ITransaction[];
  toggleModal: (toggle: boolean) => void;
}

export interface ITable2TransactionsProps {
  transactions: ITransaction[];
  showTables: boolean;
  toggleTable: (toggle: boolean) => void;
}

export interface TableHeaderProps {
  tableName: string;
  setYearSelected: (prop: number) => void;
  setMonthSelected: (prop: number) => void;
}
