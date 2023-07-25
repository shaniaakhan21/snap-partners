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
}
