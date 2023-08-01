import Head from "next/head";
import { Page, ReactNode } from "lib/types";
import { APP_INFO } from "config/appInfo";
import { getLocalStorage } from "lib/utils/localStorage";
import DashboardLayout from "layouts/private/Dashboard";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { ITransaction, ITableTransactionsProps } from "lib/types/transaction";
import { useEffect, useState } from "react";
import ErcModal from "lib/modals/ErcModal";
import PersonalClientsTable from "components/page/erc/PersonalClientsTable";
import TeamClientsTable from "components/page/erc/TeamClientsTable";
import TableHeader from "components/page/erc/TableHeader";
import PersonListTable from "components/page/erc/PersonListTable";
import ShowDetailedTables from "components/page/erc/ShowDetailedTables";

const { SEO } = APP_INFO;

const ErcreferralsPage: Page = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsClient, setTransactionsClient] = useState([]);
  const [monthSelected, setMonthSelected] = useState(new Date().getMonth());
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear());
  const [personListOpen, setPersonListOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showTables, setShowTables] = useState(false);

  const toggleModal = (toggle: boolean) => {
    setIsOpen(toggle);
  };

  const toggleTables = (toggle: boolean) => {
    setShowTables(toggle);
  };

  const years = [];
  for (let i = new Date().getFullYear(); i >= 2022; i--) {
    years.push(i);
  }

  useEffect(() => {
    (async function () {
      try {
        const token = getLocalStorage("accessToken");

        const res = await fetch("/api/erc/getTable", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        setTransactions(data);
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const token = getLocalStorage("accessToken");
        const res = await fetch(
          `/api/erc/getTableClients?month=${
            monthSelected + 1
          }&year=${yearSelected}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        setTransactionsClient(data);
      } catch (e) {}
    })();
  }, [monthSelected, yearSelected]);

  return (
    <>
      <div id="cro-erc-process">
        <div className="">
          <h1>The ERC Process has 3 Phases that trigger payout</h1>
          <div>
            <ul>
              <li>Phase 1</li>
              <li>New Client</li>
            </ul>
            <ul>
              <li>Phase 2</li>
              <li> Jorns Filling Work</li>
            </ul>
            <ul>
              <li>Phase 3</li>
              <li>IRS Payment</li>
            </ul>
          </div>
        </div>
      </div>
      <ErcModal isOpen={isOpen} toggleModal={toggleModal} />
      <div id="table1erc" className="">
        <div className="pb-2 text-lg font-sans font-semibold text-gray-800">
          Your Personal Clients
        </div>
        <PersonalClientsTable
          transactions={transactions}
          toggleModal={toggleModal}
        />
        <TableHeader
          tableName="Your Team Clients"
          setMonthSelected={setMonthSelected}
          setYearSelected={setYearSelected}
        />
        <div className="text-center">
          <TeamClientsTable
            transactions={transactionsClient}
            toggleTable={toggleTables}
          />
        </div>
      </div>
      {showTables && (
        <div id="table1erc">
          <TableHeader
            tableName="Team Level Report"
            setMonthSelected={setMonthSelected}
            setYearSelected={setYearSelected}
          />
          <ShowDetailedTables setPersonListOpen={setPersonListOpen} />
        </div>
      )}
      {personListOpen && (
        <div id="table1erc">
          <TableHeader
            tableName="Bill Jones List"
            setMonthSelected={setMonthSelected}
            setYearSelected={setYearSelected}
          />
          <PersonListTable />
        </div>
      )}
    </>
  );
};

ErcreferralsPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - ERC Reporting</title>
    </Head>

    {page}
  </DashboardLayout>
);

export default ErcreferralsPage;
