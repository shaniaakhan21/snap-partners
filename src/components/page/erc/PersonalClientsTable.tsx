import ReactDataGrid from "@inovua/reactdatagrid-community";
import { ITableTransactionsProps } from "lib/types/transaction";

const PersonalClientsTable = ({ transactions }: ITableTransactionsProps) => {
  const columns = [
    { name: "phase", header: "Phase", defaultFlex: 1, minWidth: 60 },
    { name: "id", header: "ID", defaultFlex: 1, minWidth: 60 },
    { name: "business_name", header: "Company", defaultFlex: 1, minWidth: 110 },
    { name: "email", header: "Email", defaultFlex: 1, minWidth: 85 },
    { name: "phone", header: "Phone", defaultFlex: 1, minWidth: 90 },
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
      columns={columns}
      dataSource={transactions}
      sortable={true}
      defaultFilterValue={filterValue}
      style={gridStyle}
      defaultLimit={10}
      pagination
    />
  );
};

export default PersonalClientsTable;
