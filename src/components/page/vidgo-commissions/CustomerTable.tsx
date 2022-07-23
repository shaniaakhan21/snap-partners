const tableHeaders = [
  'Customer Name',
  'Customer Email',
  'Package',
  'Join Date',
  'Last Payment',
  'Monthly Earning'
]

export const CustomerTable = ({ myCustomers }: { myCustomers: any[] }) => {
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
        {myCustomers.map((customer, key) => (
          <tr key={key} className='border-t border-zinc-300'>
            <td className='px-4 py-2 text-left'>{customer.customerName}</td>
            <td className='px-4 py-2 text-left'>{customer.customerEmail}</td>
            <td className='px-4 py-2 text-left'>{customer.package}</td>
            <td className='px-4 py-2 text-left'>{customer.joinDate}</td>
            <td className='px-4 py-2 text-left'>{customer.lastPayment}</td>
            <td className='px-4 py-2 text-center'>{customer.monthlyEarning}</td>
          </tr>
        ))}
        <tr>
          <td></td>
        </tr>
      </tbody>
    </table>
  )
}
