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

const { SEO } = APP_INFO;

const ErcreferralsPage: Page = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsClient, setTransactionsClient] = useState([]);
  const [monthSelected, setMonthSelected] = useState(new Date().getMonth());
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear());

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
      <ErcModal />
      <div id="table1erc" className="">
        <div className="pb-2 text-lg font-sans font-semibold text-gray-800">
          Your Personal Clients
        </div>
        <PersonalClientsTable transactions={transactions} />
        <div className="flex items-center">
          <div className="text-lg font-sans font-semibold text-gray-800">
            Your Team Clients
          </div>
          <select
            id="legalType"
            name="legalType"
            className="ml-5 cursor-pointer relative xs:mr-2 pl-2 pr-12 py-0 xs:py-1 my-2 bg-[rgba(255,255,255,.13)] rounded-md border border-solid border-black outline-none appearance-none leading-8"
            placeholder="User Rank"
            onChange={(current) => {
              setMonthSelected(parseInt(current.target.value));
            }}
          >
            {month.map((m, i) => {
              return (
                <option
                  key={i}
                  selected={new Date().getMonth() === i}
                  value={i}
                >
                  {m}
                </option>
              );
            })}
          </select>
          <select
            id="legalType"
            name="legalType"
            className="ml-5 cursor-pointer relative xs:mr-2 pl-2 pr-12 py-0 xs:py-1 my-2 bg-[rgba(255,255,255,.13)] rounded-md border border-solid border-black outline-none appearance-none leading-8"
            placeholder="User Rank"
            onChange={(current) => {
              setYearSelected(parseInt(current.target.value));
            }}
          >
            {years.map((y, i) => {
              return (
                <option
                  key={i}
                  selected={new Date().getFullYear() === y}
                  value={y}
                >
                  {y}
                </option>
              );
            })}
          </select>
        </div>
        <div className="text-center">
          <TeamClientsTable transactions={transactionsClient} />
        </div>
      </div>
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
