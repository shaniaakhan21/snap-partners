export const RetentionMonthly = () => {
  return (
    <table className='table-auto w-full bg-white mt-4'>
      <thead className='bg-zinc-200'>
        <tr className='px-2 py-2'>
          <th>Retention</th>
          <th>% Total Payout</th>
        </tr>
      </thead>

      <tbody className='text-center'>
        <tr className='border-b border-zinc-300 py-1'>
          <td className='border-r border-zinc-300'>1st Month</td>
          <td>10%</td>
        </tr>

        <tr className='border-b border-zinc-300 py-1'>
          <td className='border-r border-zinc-300'>2nd Month</td>
          <td>10%</td>
        </tr>

        <tr className='border-b border-zinc-300 py-1'>
          <td className='border-r border-zinc-300'>3nd Month</td>
          <td>10%</td>
        </tr>

        <tr className='border-b border-zinc-300 py-1'>
          <td className='border-r border-zinc-300'>6th Month</td>
          <td>20%</td>
        </tr>

        <tr>
          <td className='border-r border-zinc-300 py-1'>12th Month</td>
          <td>50%</td>
        </tr>
      </tbody>
    </table>
  )
}
