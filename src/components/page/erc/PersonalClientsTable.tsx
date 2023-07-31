import ReactDataGrid from "@inovua/reactdatagrid-community";
import { ITableTransactionsProps } from "lib/types/transaction";
import React from "react";
import TableHeader from "components/page/erc/TableHeader";

const PersonalClientsTable: React.FC<ITableTransactionsProps> = ({
  transactions,
  toggleModal,
}) => {
  const columns = [
    {
      name: "phase",
      header: "Phase",
      defaultFlex: 1,
      minWidth: 30,
      maxWidth: 100,
      render: (e) => {
        const phase = e.data.phase;
        return (
          <div
            className={`${
              phase === 1
                ? "bg-primary-500 text-white text-center p-2 text-sm"
                : phase === 2
                ? "bg-primary-100 text-white text-center p-2 text-sm"
                : "bg-primary-200 text-white text-center p-2 text-sm"
            }`}
          >
            {phase}
          </div>
        );
      },
    },
    { name: "id", header: "ID", defaultFlex: 1, minWidth: 60 },
    { name: "business_name", header: "Company", defaultFlex: 1, minWidth: 110 },
    { name: "email", header: "Email", defaultFlex: 1, minWidth: 85 },
    { name: "phone", header: "Phone", defaultFlex: 1, minWidth: 90 },
    {
      name: "details",
      header: "See More",
      defaultFlex: 1,
      minWidth: 90,
      render: () => {
        return (
          <span>
            <button
              className="text-textAcent-500"
              onClick={() => toggleModal(true)}
            >
              Details
            </button>
          </span>
        );
      },
    },
  ];

  const newtransactions = [
    {
      phase: 1,
      id: 259,
      business_name: "Xatai",
      email: "xatai@gmail.com",
      phone: "419419",
      details: [],
    },
    {
      phase: 2,
      id: 259,
      business_name: "Xatai",
      email: "xatai@gmail.com",
      phone: "419419",
      details: [],
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
      columns={columns}
      dataSource={newtransactions}
      sortable={true}
      defaultFilterValue={filterValue}
      rowHeight={null}
      style={gridStyle}
      defaultLimit={10}
      pagination
      showEmptyRows={false}
    />
  );
};

export default PersonalClientsTable;
