import { calculateMonthlyEarning } from 'lib/utils/vidgoCalculates'
import { useEffect, useState } from 'react'

const tableHeaders = [
  'Customer Name',
  'Last Payment',
  'Package',
  'Join Date',
  'Monthly Earning'
]

export const CustomerTable = ({ myCustomers }: { myCustomers: any[] }) => {
  const [customerNormalized, setCustomersNormalized] = useState([])

  useEffect(() => {
    const customersWithMonthlyEarning = calculateMonthlyEarning(myCustomers)
    setCustomersNormalized(customersWithMonthlyEarning)
  }, [myCustomers])

  return (
    <table className='table-auto w-full bg-white mt-4'>
      <thead>
        <tr>
          {tableHeaders.map((header, key) => (
            <td key={key} className='px-4 py-2 text-sm font-semibold'>
              <span>{header}</span>
            </td>
          ))}
        </tr>
      </thead>

      <tbody className='text-xs'>
        {customerNormalized.map((customer, key) => (
          <tr key={key} className='border-t border-zinc-300'>
            <td className='px-4 py-2 text-left'>{customer.customerName}</td>
            <td className='px-4 py-2 text-left'>{customer.lastPayment}</td>
            <td className='px-4 py-2 text-left'>{customer.package}</td>
            <td className='px-4 py-2 text-left'>{customer.joinDate}</td>
            <td className={`px-4 py-2 text-center font-semibold ${customer.monthlyEarning !== 'Empty' ? 'text-green-500' : 'text-zinc-500'}`}>
              {customer.monthlyEarning}
            </td>
          </tr>
        ))}
        <tr>
          <td></td>
        </tr>
      </tbody>
    </table>
  )
}
