import Head from 'next/head';
import { Page, ReactNode } from 'lib/types';
import { APP_INFO } from 'config/appInfo';
import { getLocalStorage } from 'lib/utils/localStorage';
import DashboardLayout from 'layouts/private/Dashboard';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import { ITransaction, ITableTransactionsProps } from 'lib/types/transaction';
import { useEffect, useState } from 'react';
import ErcModal from 'lib/modals/ErcModal';
import PersonalClientsTable from 'components/page/erc/PersonalClientsTable';
import TeamClientsTable from 'components/page/erc/TeamClientsTable';
import TableHeader from 'components/page/erc/TableHeader';
import PersonListTable from 'components/page/erc/PersonListTable';
import ShowDetailedTables from 'components/page/erc/ShowDetailedTables';

const { SEO } = APP_INFO;

const ErcreferralsPage: Page = () => {
  const [clients, setClients] = useState([])
  const [totalClientCount, setTotalClientCount] = useState(0)
  const [transactionsClient, setTransactionsClient] = useState([]);
  const [monthSelected, setMonthSelected] = useState(new Date().getMonth());
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear());
  const [personListOpen, setPersonListOpen] = useState(false);
  const [showTables, setShowTables] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const toggleTables = (toggle: boolean) => {
    setShowTables(toggle);
  };

  const years = [];
  for (let i = new Date().getFullYear(); i >= 2022; i--) {
    years.push(i);
  }

  const temporaryMap = (data) => {
    const mapData = (d) => {
      const quarterKeys = Object.keys(d).filter(key => key.startsWith("erc_2"))
      const quarters = quarterKeys.map(key => ({
        year: key.substring(4, key.indexOf('_', 4)),
        quarter: key.substring(10).toUpperCase()
      }))
      const determinePhase = (d) => {
        // TODO include phase 3
        if (d.ready_for_doc_prep_date) {
          return 2
        }
        return 1
      }
      return ({
        phase: determinePhase(d),
        email: d.Email,
        client: d.client,
        companyName: d.company_name,
        phone: d.phone_number,
        aggrementSigned: d['q&a'] === 'Yes',
        depositPaid: d['deposit-amount'],
        docsCollected: d.ready_for_doc_prep_date,
        excelTeam: d.ready_for_calculation_date,
        docSentForSignature: d.ready_for_filing_specialist,
        docForSignatureReturned: d.client_sent_to_billing_date,
        quarters,
        signupDate: d['client-acquired-date']
      })
    }
    return data.map(mapData)
  }

  useEffect(() => {
    (async function () {
      try {
        const token = getLocalStorage('accessToken');

        // const res = await fetch('/api/erc/getTable', {
        //   method: 'GET',
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        const res = await fetch('https://app.jornstax.com/api/referral-partner-clients?per_page=20&page=2&api_token=')

        const data = await res.json();
        setClients(temporaryMap(data.data))
        setTotalClientCount(data.total)
        // setTransactions(data);
      } catch (e) {}
    })()
  }, [])

  useEffect(() => {
    (async function () {
      try {
        const token = getLocalStorage('accessToken');
        const res = await fetch(
          `/api/erc/getTableClients?month=${
            monthSelected + 1
          }&year=${yearSelected}`,
          {
            method: 'GET',
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
      <ErcModal client={selectedClient} isOpen={Boolean(selectedClient)} onClose={() => setSelectedClient(null)} />
      <div id="table1erc" className="">
        <div className="pb-2 text-lg font-sans font-semibold text-gray-800">
          Your Personal Clients
        </div>
        <PersonalClientsTable
          clients={clients}
          totalClientCount={totalClientCount}
          toggleModal={setSelectedClient}
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
