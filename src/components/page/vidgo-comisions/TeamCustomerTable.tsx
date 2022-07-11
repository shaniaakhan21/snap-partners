const tableHeaders = [
  ' ',
  'Customers',
  'Comission'
]

const tableBody = [
  {
    level: 'Level 1',
    customerCount: '10',
    comission: '$13'
  }
]

export const TeamCustomerTable = () => {
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
          tableBody.map((body) => (
            <tr className='border-t border-zinc-300'>
              <td className='px-4 py-2 text-center border-r border-zinc-300'>{body.level}</td>
              <td className='px-4 py-2 text-center border-r border-zinc-300'>{body.customerCount}</td>
              <td className='px-4 py-2 text-center border-r border-zinc-300'>{body.comission}</td>
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
