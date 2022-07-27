import { IReport } from 'lib/types'
import { getActivePayments, getVidgoCalculates } from 'lib/utils/vidgoCalculates'
import { useEffect, useState } from 'react'

export const TableRetentionBonusTracker = ({ report }: { report: IReport }) => {
  const [dataTotalActiveCount, setTotalActiveCount] = useState({ month1: 0, month2: 0, month3: 0, month6: 0, month12: 0 })
  const [dataPayOfTotal, setPayOfTotal] = useState({ month1: 0, month2: 0, month3: 0, month6: 0, month12: 0 })
  const [dataEligibleBenchmark, setEligibleBenchmark] = useState({ month1: 0, month2: 0, month3: 0, month6: 0, month12: 0 })
  const [dataCommission, setCommission] = useState({ month1: 0, month2: 0, month3: 0, month6: 0, month12: 0 })
  const [usersActivePaymet, setUsersActivePayments] = useState([])

  useEffect(() => {
    const { commission, eligibleBenchmark, payOfTotal, totalActiveCount } = getVidgoCalculates(report)
    setCommission(commission)
    setEligibleBenchmark(eligibleBenchmark)
    setPayOfTotal(payOfTotal)
    setTotalActiveCount(totalActiveCount)

    const users = getActivePayments(report)
    const objValues = Object.values(users)
    setUsersActivePayments(objValues)
  }, [report])

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
              {
                Object.keys(dataTotalActiveCount).map((key, index) => {
                  return (
                    <td key={index} className="text-center px-4 py-2 border-r border-zinc-300">
                      {dataTotalActiveCount[key]}
                    </td>
                  )
                })
              }
            </tr>

            <tr className="border-t border-zinc-300">
              <td className="px-4 py-2 border-r border-zinc-300">
                Eligible Benchmark
              </td>

              {
                Object.keys(dataEligibleBenchmark).map((key, index) => {
                  return (
                    <td key={index} className="text-center px-4 py-2 border-r border-zinc-300">
                      {dataEligibleBenchmark[key]}
                    </td>
                  )
                })
              }
            </tr>

            <tr className="border-t border-zinc-300">
              <td className="px-4 py-2 border-r border-zinc-300">
                % Pay of Total
              </td>

              {
                Object.keys(dataPayOfTotal).map((key, index) => {
                  return (
                    <td key={index} className="text-center px-4 py-2 border-r border-zinc-300">
                      {dataPayOfTotal[key]}%
                    </td>
                  )
                })
              }
            </tr>

            <tr className="border-t border-zinc-300">
              <td className="px-4 py-2 border-r border-zinc-300">Commission</td>

              {
                Object.keys(dataCommission).map((key, index) => {
                  return (
                    <td key={index} className="text-center px-4 py-2 border-r border-zinc-300">
                      ${dataCommission[key]}
                    </td>
                  )
                })
              }
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

          <tbody className='text-sm'>
            {
              usersActivePaymet?.map((userActivePayment, idx) => (
                <tr key={idx}>
                  <td className='text-left px-4 py-2 border-r border-zinc-300 border-t'>
                    {userActivePayment[0]}
                  </td>

                  <td className={`font-bold text-left px-4 py-2 border-r border-zinc-300 border-t ${userActivePayment[1] ? 'text-green-500' : 'text-red-500'}`}>
                    {userActivePayment[1] ? 'ACTIVE' : 'N/A'} {/* Month 1 */}
                  </td>

                  <td className={`font-bold text-left px-4 py-2 border-r border-zinc-300 border-t ${userActivePayment[2] ? 'text-green-500' : 'text-red-500'}`}>
                    {userActivePayment[2] ? 'ACTIVE' : 'N/A'} {/* Month 2 */}
                  </td>

                  <td className={`font-bold text-left px-4 py-2 border-r border-zinc-300 border-t ${userActivePayment[3] ? 'text-green-500' : 'text-red-500'}`}>
                    {userActivePayment[3] ? 'ACTIVE' : 'N/A'} {/* Month 3 */}
                  </td>

                  <td className={`font-bold text-left px-4 py-2 border-r border-zinc-300 border-t ${userActivePayment[4] ? 'text-green-500' : 'text-red-500'}`}>
                    {userActivePayment[4] ? 'ACTIVE' : 'N/A'} {/* Month 6 */}
                  </td>

                  <td className={`font-bold text-left px-4 py-2 border-r border-zinc-300 border-t ${userActivePayment[5] ? 'text-green-500' : 'text-red-500'}`}>
                    {userActivePayment[5] ? 'ACTIVE' : 'N/A'} {/* Month 12 */}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
