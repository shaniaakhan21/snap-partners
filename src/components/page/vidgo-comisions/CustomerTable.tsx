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
    customerName: 'customer',
    customerEmail: 'customer@gmail.com',
    package: 'Package 1',
    joinDate: '01/01/2020',
    lastPayment: '01/01/2020',
    monthlyEarning: '$0'
  }
]

export const CustomerTable = () => {
  return (
    <table className='table-auto w-full bg-white mt-4'>
      <thead>
        <tr>
          {
            tableHeaders.map((header) => (
              <td className='px-4 py-2 text-sm font-semibold'>
                <span>{header}</span>
              </td>
            ))
          }
        </tr>
      </thead>

      <tbody className='text-sm'>
        {
          tableBody.map((body) => (
            <tr className='border-t border-zinc-300'>
              <td className='px-4 py-2 text-left'>{body.customerName}</td>
              <td className='px-4 py-2 text-left'>{body.customerEmail}</td>
              <td className='px-4 py-2 text-left'>{body.package}</td>
              <td className='px-4 py-2 text-left'>{body.joinDate}</td>
              <td className='px-4 py-2 text-left'>{body.lastPayment}</td>
              <td className='px-4 py-2 text-center'>{body.monthlyEarning}</td>
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
