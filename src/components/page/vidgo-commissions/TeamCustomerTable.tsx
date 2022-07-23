const tableHeaders = [
  ' ',
  'Customers',
  'Comission'
]

export const TeamCustomerTable = ({ teamCustomers }: { teamCustomers: any[] }) => {
  return (
    <table className='table-auto w-full bg-white mt-4'>
      <thead>
        <tr>
          {
            tableHeaders.map((header) => (
              <td className='px-4 py-2 text-sm font-semibold text-center'>
                <span>{header}</span>
              </td>
            ))
          }
        </tr>
      </thead>

      <tbody>
        {
          teamCustomers.map((customer) => (
            <tr className='border-t border-zinc-300'>
              <td className='px-4 py-2 text-center border-r border-zinc-300'>{customer.level}</td>
              <td className='px-4 py-2 text-center border-r border-zinc-300'>{customer.customerCount}</td>
              <td className='px-4 py-2 text-center border-r border-zinc-300'>{customer.comission}</td>
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
