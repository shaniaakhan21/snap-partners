import ReactDataGrid from "@inovua/reactdatagrid-community";
import { ITableTransactionsProps } from "lib/types/transaction";

const TeamClientsTable = ({ transactions }: ITableTransactionsProps) => {
  const columnsClient = [
    { name: "level", header: "Level", defaultFlex: 1, minWidth: 150 },
    {
      name: "totalClients",
      header: "Total Clients",
      defaultFlex: 1,
      minWidth: 150,
    },
    {
      name: "registereds",
      header: "# Registered",
      defaultFlex: 1,
      minWidth: 150,
    },
    {
      name: "signedAgreements",
      header: "# Signed Agreements",
      defaultFlex: 1,
      minWidth: 220,
    },
    {
      name: "depositPaids",
      header: "# Deposits Paid",
      defaultFlex: 1,
      minWidth: 150,
    },
    {
      name: "docCollections",
      header: "# Doc Collections",
      defaultFlex: 1,
      minWidth: 150,
    },
    { name: "excelTeams", header: "# Excel Teams", flex: 1, minWidth: 200 },
    {
      name: "docsSentForSignatures",
      header: "# Docs Sent for Signature",
      flex: 1,
      minWidth: 220,
    },
    { name: "filleds", header: "# Filed", flex: 1, minWidth: 130 },
    { name: "paids", header: "# Paid?", flex: 1, minWidth: 220 },
    {
      name: "totalCommissions",
      header: "Total Commission",
      flex: 1,
      minWidth: 220,
    },
  ];

  const gridStyle = {
    minHeight: 550,
  };

  const filterValue = [
    { name: "description", operator: "startsWith", type: "string", value: "" },
    { name: "amount", operator: "startsWith", type: "string", value: "" },
  ];
  return (
    <ReactDataGrid
      idProperty="id"
      columns={columnsClient}
      dataSource={transactions}
      sortable={true}
      defaultFilterValue={filterValue}
      style={gridStyle}
      defaultLimit={10}
      pagination
    />
  );
};

export default TeamClientsTable;
