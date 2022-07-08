const tableHeaders = [
  'Customer Name',
  'Customer Email',
  'Package',
  'Join Date',
  'Last Payment',
  'Monthly Earning'
]

const tableBody = [
  {
    customerName: ' ',
    customerEmail: ' ',
    package: ' ',
    joinDate: ' ',
    lastPayment: ' ',
    monthlyEarning: ' '
  }
]

export const CustomerTable = () => {
  return (
    <table className='table-auto w-full bg-white mt-4'>
      <thead>
        <tr>
          {
            tableHeaders.map((header) => (
              <td className='px-4 py-2 text-sm font-semibold text-gray-600'>
                <span>{header}</span>
              </td>
            ))
          }
        </tr>
      </thead>

      <tbody>
        {
          tableBody.map((body) => (
            <tr className='border-t border-zinc-300'>
              <td className='px-4 py-2'>{body.customerName}</td>
              <td className='px-4 py-2'>{body.customerEmail}</td>
              <td className='px-4 py-2'>{body.package}</td>
              <td className='px-4 py-2'>{body.joinDate}</td>
              <td className='px-4 py-2'>{body.lastPayment}</td>
              <td className='px-4 py-2'>{body.monthlyEarning}</td>
            </tr>
          ))
        }
        <tr>
          <td></td>
        </tr>
      </tbody>
    </table>
  )
}
