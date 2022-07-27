export const BonusBenmarks = () => {
  return (
    <>
      <table className='table-auto w-full bg-white'>
        <thead className='bg-zinc-200'>
          <tr>
            <th className='bg-white'></th>
            <th>Track Bonus</th>
            <th className='bg-gray-1000 text-white'>$1,000&nbsp;&nbsp;</th>
          </tr>
        </thead>

        <tbody>
          <tr className='border-b border-zinc-300'>
            <td rowSpan={2} className='border-r border-zinc-300 text-lg font-semibold text-center pb-4 px-2'>
              GET <br /> 5
            </td>

            <td className='px-2'>
              Direct Bonus
            </td>

            <td className='bg-gray-1000 text-white text-right'>$500</td>
          </tr>

          <tr>
            <td className='px-2'>Upline Bonus</td>
            <td className='bg-gray-1000 text-white text-right'>$500</td>
          </tr>
        </tbody>
      </table>

      <table className='table-auto w-full mt-4 bg-white'>
        <thead className='bg-zinc-200'>
          <tr>
            <th className='bg-white'></th>
            <th>Track Bonus</th>
            <th className='bg-gray-1000 text-white'>$5,000&nbsp;&nbsp;</th>
          </tr>
        </thead>

        <tbody>
          <tr className='border-b border-zinc-300'>
            <td rowSpan={2} className='border-r border-zinc-300 text-lg font-semibold text-center pb-4 px-2'>
                GET <br /> 10
            </td>

            <td className='px-2'>
                Direct Bonus
            </td>

            <td className='bg-gray-1000 text-white text-right'>$3,000</td>
          </tr>

          <tr>
            <td className='px-2'>Upline Bonus</td>
            <td className='bg-gray-1000 text-white text-right'>$2,000</td>
          </tr>
        </tbody>
      </table>

      <table className='table-auto w-full mt-4 bg-white'>
        <thead className='bg-zinc-200'>
          <tr>
            <th className='bg-white'></th>
            <th>Track Bonus</th>
            <th className='bg-gray-1000 text-white'>$16,000</th>
          </tr>
        </thead>

        <tbody>
          <tr className='border-b border-zinc-300'>
            <td rowSpan={2} className='border-r border-zinc-300 text-lg font-semibold text-center pb-4 px-2'>
                GET <br /> 20
            </td>

            <td className='px-2'>
                Direct Bonus
            </td>

            <td className='bg-gray-1000 text-white text-right'>$10,000</td>
          </tr>

          <tr>
            <td className='px-2'>Upline Bonus</td>
            <td className='bg-gray-1000 text-white text-right'>$6,000</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
