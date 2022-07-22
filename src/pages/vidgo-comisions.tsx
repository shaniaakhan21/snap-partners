import Head from "next/head";
import { useEffect, useState } from "react";

import type { Page, ReactNode } from "lib/types";
import { useAuthStore } from "lib/stores";
import { APP_INFO } from "config/appInfo";

import DashboardLayout from "layouts/private/Dashboard";
import { BonusBenmarks } from "components/page/vidgo-comisions/BonusBenmarksTable";
import { RetentionMonthly } from "components/page/vidgo-comisions/RetentionMonthly";
import { CustomerTable } from "components/page/vidgo-comisions/CustomerTable";
import { TeamCustomerTable } from "components/page/vidgo-comisions/TeamCustomerTable";
import { TableRetentionBonusTracker } from "components/page/vidgo-comisions/TableRetentionBonusTracker";

import { commissions } from "lib/services/vidgo/commissions";
import { handleFetchError } from "lib/utils/handleFetchError";
import { DataUsage } from "@material-ui/icons";

const { SEO } = APP_INFO;

const dataReport = {
  teamCustomers: [
    {
      label: "Level 1",
      count: 10,
      comission: 13,
    },
  ],

  myCustomers: [
    {
      level: 1,
      customerName: "customer1",
      customerEmail: "customer@gmail.com",
      package: "Package 1",
      joinDate: "01/01/2020",
      lastPayment: "01/01/2020",
      monthlyEarning: 4,
    },
  ],

  bonusTrackerMonthly: {
    totalActiveCount: {
      month1: 0,
      month2: 0,
      month3: 0,
      month6: 0,
      month12: 0,
    },

    eligibleBenchmark: {
      month1: 0,
      month2: 0,
      month3: 0,
      month6: 0,
      month12: 0,
    },

    payOfTotal: {
      month1: 0,
      month2: 0,
      month3: 0,
      month6: 0,
      month12: 0,
    },

    commission: {
      month1: 0,
      month2: 0,
      month3: 0,
      month6: 0,
      month12: 0,
    },
  },

  activePayments: [
    {
      customerName: "customer1",
      month1: 0,
      month2: 0,
      month3: 0,
      month6: 0,
      month12: 0,
    },
  ],
};

var monthNames = [
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

const VidgoComisionsPage: Page = () => {
  const [vidgoReport, setVidgoReport] = useState(null);
  const [dateSelected, setDateSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuthStore();
  const [customers, setCustomers] = useState([]);
  const [teamCustomers, setTeamCustomers] = useState([]);
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await commissions(auth.accessToken);

      if (error) {
        handleFetchError(error.status, error.info);
        setLoading(false);
        return;
      }

      setVidgoReport(data);
      setLoading(false);
    })();
  }, []);

  const handleChange = (event) => {
    setDateSelected(event.target.value);
  };

  const getMonthName = (date, fullName) => {
    var monthName = monthNames[date];
    return fullName ? monthName : monthName.substring(0, 3);
  };

  useEffect(() => {
    if (vidgoReport) {
      let customs = [];
      let teams = [];
      let months = [];
      vidgoReport.forEach((element) => {
        customs.push({
          customerName: element["name"],
          customerEmail: element["email"],
          package: element["package"],
          joinDate: element["joinDate"],
          lastPayment: element["paymentDate"],
          monthlyEarning: element["total"],
        });
        teams.push({
          name: element["name"],
          level: "3",
          customerCount: "3",
          comission: "2444",
        });
        let rowDate = new Date(element["joinDate"]);
        let name =
          getMonthName(rowDate.getMonth() + 1, monthNames) +
          " " +
          rowDate.getFullYear();
        let value = new Date(
          rowDate.getFullYear(),
          rowDate.getMonth() + 1,
          1
        ).toDateString();
        let monthObj = {
          name: name,
          value: value,
        };
        if (!months.some((e) => e.value === value)) {
          months.push(monthObj);
        }
      });
      setDates(months);
      setCustomers(customs);
      setTeamCustomers(teams);
    }
  }, [vidgoReport]);

  useEffect(() => {
    if (vidgoReport) {
      let nextMonth = new Date(
        new Date(dateSelected).getFullYear(),
        new Date(dateSelected).getMonth() + 1,
        1
      );
      let report = vidgoReport.filter((item: any) => {
        return (
          new Date(item.paymentDate).getTime() <
            new Date(dateSelected).getTime() ||
          new Date(item.paymentDate).getTime() > nextMonth.getTime()
        );
      });
      setMonthlyReport(report);
    }
  }, [dateSelected]);

  if (!auth.roles.merchant) {
    return (
      <div className="h-screen-80 w-full flex justify-center items-center">
        <span className="text-4xl font-black">Should be a IBO</span>
      </div>
    );
  }

  return (
    vidgoReport && (
      <div>
        <section className="w-full h-full flex flex-col-reverse lg:flex-row justify-between items-center lg:items-start gap-x-8 gap-y-8">
          <div className="overflow-x-scroll scroll-x-primary w-full lg:w-2/3 h-full">
            <h5 className="text-lg font-semibold">Your Customers</h5>

            <CustomerTable myCustomers={customers} />
          </div>

          <div className="w-full lg:w-1/3">
            <div className="flex justify-between items-start">
              <h5 className="text-lg font-semibold">Team Customers</h5>

              <div className="flex justify-end items-center gap-x-4 text-right">
                <span className="text-xs">
                  Total Downline <br /> Customers
                </span>

                <div className="border border-zinc-400 rounded-sm px-4 py-1">
                  <span className="text-xl font-semibold">1766</span>
                </div>
              </div>
            </div>

            <TeamCustomerTable teamCustomers={teamCustomers} />
          </div>
        </section>

        <section className="w-full h-full mt-10 flex flex-col-reverse lg:flex-row justify-between items-center lg:items-start gap-x-8 gap-y-8">
          <div className="w-full lg:w-2/3 h-full">
            <h5 className="text-2xl font-bold text-primary-500">
              Vidgo Premium Service RETENTION BONUS TRACKER
            </h5>

            <div className="flex flex-col justify-start items-start">
              <select
                className="mt-4 py-1 px-4 select-clean"
                value={dateSelected}
                onChange={handleChange}
              >
                {dates.map((option) => (
                  <option key={option.value} value={option.value}>
                    Month: {option.name}
                  </option>
                ))}
              </select>
            </div>

            <TableRetentionBonusTracker report={monthlyReport} />
          </div>

          <div className="w-full lg:w-1/3">
            <span className="text-xl font-bold">
              Retention Bonus Benchmarked
            </span>
            <br />

            <div className="w-full h-full mt-5">
              <BonusBenmarks />

              <RetentionMonthly />
            </div>
          </div>
        </section>
      </div>
    )
  );
};

VidgoComisionsPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Vidgo Comisions</title>
    </Head>
    {page}
  </DashboardLayout>
);

export default VidgoComisionsPage;
