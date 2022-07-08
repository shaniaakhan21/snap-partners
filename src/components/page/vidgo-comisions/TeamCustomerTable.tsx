const tableHeaders = [
  ' ',
  'Customers',
  'Comission'
]

const tableBody = [
  {
    level: ' ',
    customerCount: ' ',
    comission: ' '
  }
]

export const TeamCustomerTable = () => {
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
              <td className='px-4 py-2'>{body.level}</td>
              <td className='px-4 py-2'>{body.customerCount}</td>
              <td className='px-4 py-2'>{body.comission}</td>
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
