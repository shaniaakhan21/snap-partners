import ReactDataGrid from "@inovua/reactdatagrid-community";
import React from "react";

type ShowDetailedTablesProps = {
  setPersonListOpen: (prop: boolean) => void;
};

const ShowDetailedTables: React.FC<ShowDetailedTablesProps> = ({
  setPersonListOpen,
}) => {
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
  const teamLevelReport = [
    { name: "IBO", header: "IBO Name", defaultFlex: 1, minWidth: 150 },
    {
      name: "totalClients",
      header: "Total Clients",
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
      name: "phase1",
      header: "Phase 1",
      defaultFlex: 1,
      minWidth: 150,
    },
    {
      name: "phase2",
      header: "Phase 2",
      defaultFlex: 1,
      minWidth: 150,
    },
    {
      name: "phase3",
      header: "Phase 3",
      defaultFlex: 1,
      minWidth: 150,
    },
    {
      name: "details",
      header: "See more",
      defaultFlex: 1,
      minWidth: 150,
      render: () => {
        return (
          <span>
            <button
              className="text-textAcent-500"
              onClick={() => setPersonListOpen(true)}
            >
              Details
            </button>
          </span>
        );
      },
    },
  ];
  return (
    <div>
      <ReactDataGrid
        idProperty="id"
        columns={teamLevelReport}
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

export default ShowDetailedTables;
