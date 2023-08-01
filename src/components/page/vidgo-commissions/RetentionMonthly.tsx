import { useTranslation } from 'next-i18next'

export const RetentionMonthly = () => {
  const { t } = useTranslation('vidgo-reporting')

  return (
    <table className='table-auto w-full bg-white mt-4'>
      <thead className='bg-zinc-200'>
        <tr className='px-2 py-2'>
          <th>{t('retentionMonthly.retention')}</th>
          <th>{t('retentionMonthly.total_payout')}</th>
        </tr>
      </thead>

      <tbody className='text-center'>
        <tr className='border-b border-zinc-300 py-1'>
          <td className='border-r border-zinc-300'>{t('retentionMonthly.month_1')}</td>
          <td>10%</td>
        </tr>

        <tr className='border-b border-zinc-300 py-1'>
          <td className='border-r border-zinc-300'>{t('retentionMonthly.month_2')}</td>
          <td>10%</td>
        </tr>

        <tr className='border-b border-zinc-300 py-1'>
          <td className='border-r border-zinc-300'>{t('retentionMonthly.month_3')}</td>
          <td>10%</td>
        </tr>

        <tr className='border-b border-zinc-300 py-1'>
          <td className='border-r border-zinc-300'>{t('retentionMonthly.month_6')}</td>
          <td>20%</td>
        </tr>

        <tr>
          <td className='border-r border-zinc-300 py-1'>{t('retentionMonthly.month_12')}</td>
          <td>50%</td>
        </tr>
      </tbody>
    </table>
  )
}
