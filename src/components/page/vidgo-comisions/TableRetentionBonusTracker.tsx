import { useState } from "react"

interface IVidgoReportMonthly {
  accountUID: string
  subID: string
  name: string
  UID: string | null,
  zip: string
  city: string
  state: string
  partner: string
  partnerAgentId: string
  package: string
  joinDate: string
  paymentDate: string
  days: string
  start: string
  end: string
  invoice: string
  subtotal: string
  tax: string
  discount: string
  total: string
  status: string
  createdAt: string
  updatedAt: string
}

interface IDateSelected {
  monthNumber: number
  date: string
  year: number
}

export const TableRetentionBonusTracker = ({ report, dateSelected }: { report: IVidgoReportMonthly[], dateSelected: IDateSelected }) => {
  console.log('dateSelected', dateSelected)

  console.log('month 1', dateSelected.monthNumber)
  console.log('month 2', dateSelected.monthNumber + 1)
  console.log('month 3', dateSelected.monthNumber + 2)
  console.log('month 6', dateSelected.monthNumber + 5)
  console.log('month 12', dateSelected.monthNumber + 11)

  // console.log('Report[0]', report[0])
  // console.log('Report[0] paymentDate.getMonth => ', report.length > 1 && new Date(report[0].paymentDate).getMonth())
  // console.log(`Report [Month ${monthSelectedNumber} - Year ${yearSelected}]`, report)

  return (
    <>
      <div className="overflow-x-scroll scroll-x-primary w-full h-full">
        <table className="table-auto w-full bg-white mt-4">
          <thead>
            <tr>
              <th className="w-52">&nbsp;</th>
              <th className="px-2">Month 1</th>
              <th className="px-2">Month 2</th>
              <th className="px-2">Month 3</th>
              <th className="px-2">Month 6</th>
              <th className="px-2">Month 12</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-zinc-300">
              <td className="px-4 py-2 border-r border-zinc-300">
                Total Active Count
              </td>
              <td className="text-center px-4 py-2 border-r border-zinc-300">
                {report.filter(row => (new Date(row.paymentDate).getMonth() === dateSelected.monthNumber)).length || 0}
              </td>
              <td className="text-center px-4 py-2 border-r border-zinc-300">
                0
              </td>
              <td className="text-center px-4 py-2 border-r border-zinc-300">
                0
              </td>
              <td className="text-center px-4 py-2 border-r border-zinc-300">
                0
              </td>
              <td className="text-center px-4 py-2">0</td>
            </tr>

            <tr className="border-t border-zinc-300">
              <td className="px-4 py-2 border-r border-zinc-300">
                Eligible Benchmark
              </td>
              <td className="text-center px-4 py-2 border-r border-zinc-300">
                0
              </td>
              <td className="text-center px-4 py-2 border-r border-zinc-300">
                0
              </td>
              <td className="text-center px-4 py-2 border-r border-zinc-300">
                0
              </td>
              <td className="text-center px-4 py-2 border-r border-zinc-300">
                0
              </td>
              <td className="text-center px-4 py-2">0</td>
            </tr>

            <tr className="border-t border-zinc-300">
              <td className="px-4 py-2 border-r border-zinc-300">
                % Pay of Total
              </td>
              <td className="text-center px-4 py-2 border-r border-zinc-300">
                0
              </td>
              <td className="text-center px-4 py-2 border-r border-zinc-300">
                0
              </td>
              <td className="text-center px-4 py-2 border-r border-zinc-300">
                0
              </td>
              <td className="text-center px-4 py-2 border-r border-zinc-300">
                0
              </td>
              <td className="text-center px-4 py-2">0</td>
            </tr>

            <tr className="border-t border-zinc-300">
              <td className="px-4 py-2 border-r border-zinc-300">Commission</td>
              <td className="text-center px-4 py-2 border-r border-zinc-300">
                0
              </td>
              <td className="text-center px-4 py-2 border-r border-zinc-300">
                0
              </td>
              <td className="text-center px-4 py-2 border-r border-zinc-300">
                0
              </td>
              <td className="text-center px-4 py-2 border-r border-zinc-300">
                0
              </td>
              <td className="text-center px-4 py-2">0</td>
            </tr>
          </tbody>
        </table>
      </div>

      <section className="text-center mt-4">
        <h5 className="text-lg font-bold">Active Payments</h5>
      </section>

      <div className="overflow-x-scroll scroll-x-primary w-full h-full">
        <table className="table-auto w-full bg-white mt-2 overflow-y-scroll">
          <thead>
            <tr>
              <th className="w-52">&nbsp;</th>
              <th className="px-4">Month 1</th>
              <th className="px-4">Month 2</th>
              <th className="px-4">Month 3</th>
              <th className="px-4">Month 6</th>
              <th className="px-4">Month 12</th>
            </tr>
          </thead>

          <tbody>
            {report.map((customer, idx) => {
              return (
                <tr className="border-t border-zinc-300" key={idx}>
                  <td className="px-4 py-2 border-r border-zinc-300">
                    {customer.name}
                  </td>
                  <td className="text-center px-4 py-2 border-r border-zinc-300">
                    {customer.status}
                  </td>
                  <td className="text-center px-4 py-2 border-r border-zinc-300">
                    {customer.status}
                  </td>
                  <td className="text-center px-4 py-2 border-r border-zinc-300">
                    {customer.status}
                  </td>
                  <td className="text-center px-4 py-2 border-r border-zinc-300">
                    {customer.status}
                  </td>
                  <td className="text-center px-4 py-2">
                    {customer.status}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
