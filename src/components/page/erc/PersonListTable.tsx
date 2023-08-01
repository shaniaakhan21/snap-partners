import ReactDataGrid from "@inovua/reactdatagrid-community";
import React from "react";

const PersonListTable = () => {
  const gridStyle = {
    minHeight: 350,
  };

  const teamList = [
    {
      IBO: "Kvicha",
      totalClients: 25,
      depositsPaid: 12,
      phase1: 5,
      phase2: 4,
      phase3: 3,
    },
    {
      IBO: "Shevchenko",
      totalClients: 23,
      depositsPaid: 11,
      phase1: 4,
      phase2: 4,
      phase3: 3,
    },
    {
      IBO: "Kaladze",
      totalClients: 41,
      depositsPaid: 15,
      phase1: 3,
      phase2: 7,
      phase3: 5,
    },
  ];

  const filterValue = [
    { name: "description", operator: "startsWith", type: "string", value: "" },
    { name: "amount", operator: "startsWith", type: "string", value: "" },
  ];
  const personalReport = [
    { name: "ercID", header: "ERC ID", defaultFlex: 1, minWidth: 150 },
    {
      name: "dateAcquired",
      header: "Date Acquired",
      defaultFlex: 1,
      minWidth: 150,
    },
    {
      name: "depositsPaid",
      header: "Deposits Paid",
      defaultFlex: 1,
      minWidth: 150,
    },
    {
      name: "completedPh1",
      header: "Completed Ph.1",
      defaultFlex: 1,
      minWidth: 150,
    },
    {
      name: "completedPh2",
      header: "Completed Ph.2",
      defaultFlex: 1,
      minWidth: 150,
    },
    {
      name: "completedPh3",
      header: "Completed Ph.3",
      defaultFlex: 1,
      minWidth: 150,
    },
  ];
  return (
    <div>
      <ReactDataGrid
        idProperty="id"
        columns={personalReport}
        dataSource={teamList}
        sortable={true}
        defaultFilterValue={filterValue}
        style={gridStyle}
        defaultLimit={6}
        pagination
      />
    </div>
  );
};

export default PersonListTable;
