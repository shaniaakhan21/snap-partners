export const TableRetentionBonusTracker = () => {
  return (
    <>
      <div className='overflow-x-scroll scroll-x-primary w-full h-full'>
        <table className='table-auto w-full bg-white mt-4'>
          <thead>
            <tr>
              <th className='w-52'>&nbsp;</th>
              <th className='px-2'>Month 1</th>
              <th className='px-2'>Month 2</th>
              <th className='px-2'>Month 3</th>
              <th className='px-2'>Month 6</th>
              <th className='px-2'>Month 12</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-t border-zinc-300'>
              <td className='px-4 py-2 border-r border-zinc-300'>Total Active Count</td>
              <td className='text-center px-4 py-2 border-r border-zinc-300'>0</td>
              <td className='text-center px-4 py-2 border-r border-zinc-300'>0</td>
              <td className='text-center px-4 py-2 border-r border-zinc-300'>0</td>
              <td className='text-center px-4 py-2 border-r border-zinc-300'>0</td>
              <td className='text-center px-4 py-2'>0</td>
            </tr>

            <tr className='border-t border-zinc-300'>
              <td className='px-4 py-2 border-r border-zinc-300'>Eligible Benchmark</td>
              <td className='text-center px-4 py-2 border-r border-zinc-300'>0</td>
              <td className='text-center px-4 py-2 border-r border-zinc-300'>0</td>
              <td className='text-center px-4 py-2 border-r border-zinc-300'>0</td>
              <td className='text-center px-4 py-2 border-r border-zinc-300'>0</td>
              <td className='text-center px-4 py-2'>0</td>
            </tr>

            <tr className='border-t border-zinc-300'>
              <td className='px-4 py-2 border-r border-zinc-300'>% Pay of Total</td>
              <td className='text-center px-4 py-2 border-r border-zinc-300'>0</td>
              <td className='text-center px-4 py-2 border-r border-zinc-300'>0</td>
              <td className='text-center px-4 py-2 border-r border-zinc-300'>0</td>
              <td className='text-center px-4 py-2 border-r border-zinc-300'>0</td>
              <td className='text-center px-4 py-2'>0</td>
            </tr>

            <tr className='border-t border-zinc-300'>
              <td className='px-4 py-2 border-r border-zinc-300'>Commission</td>
              <td className='text-center px-4 py-2 border-r border-zinc-300'>0</td>
              <td className='text-center px-4 py-2 border-r border-zinc-300'>0</td>
              <td className='text-center px-4 py-2 border-r border-zinc-300'>0</td>
              <td className='text-center px-4 py-2 border-r border-zinc-300'>0</td>
              <td className='text-center px-4 py-2'>0</td>
            </tr>
          </tbody>
        </table>
      </div>

      <section className='text-center mt-4'>
        <h5 className='text-lg font-bold'>Active Payments</h5>
      </section>

      <div className='overflow-x-scroll scroll-x-primary w-full h-full'>
        <table className='table-auto w-full bg-white mt-2 overflow-y-scroll'>
          <thead>
            <tr>
              <th className='w-52'>&nbsp;</th>
              <th className='px-4'>Month 1</th>
              <th className='px-4'>Month 2</th>
              <th className='px-4'>Month 3</th>
              <th className='px-4'>Month 6</th>
              <th className='px-4'>Month 12</th>
            </tr>
          </thead>

          <tbody>
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((mount) => {
                return (
                  <tr className='border-t border-zinc-300' key={mount}>
                    <td className='px-4 py-2 border-r border-zinc-300'>Customer</td>
                    <td className='text-center px-4 py-2 border-r border-zinc-300'>0</td>
                    <td className='text-center px-4 py-2 border-r border-zinc-300'>0</td>
                    <td className='text-center px-4 py-2 border-r border-zinc-300'>0</td>
                    <td className='text-center px-4 py-2 border-r border-zinc-300'>0</td>
                    <td className='text-center px-4 py-2'>0</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
