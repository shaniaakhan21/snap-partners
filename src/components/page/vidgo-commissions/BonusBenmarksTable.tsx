import {Trans, useTranslation} from "next-i18next";

export const BonusBenmarks = () => {
  const { t } = useTranslation('vidgo-reporting')
  return (
    <>
      <table className='table-auto w-full bg-white'>
        <thead className='bg-zinc-200'>
          <tr>
            <th className='bg-white'></th>
            <th>{t('bonusBenchmarks.track_bonus')}</th>
            <th className='bg-gray-1000 text-white'>$1,000&nbsp;&nbsp;</th>
          </tr>
        </thead>

        <tbody>
          <tr className='border-b border-zinc-300'>
            <td rowSpan={2} className='border-r border-zinc-300 text-lg font-semibold text-center pb-4 px-2'>
              <Trans i18nKey='bonusBenchmarks.get_n' components={{ br: <br /> }} values={{ n: 3 }} />
            </td>

            <td className='px-2'>
              {t('bonusBenchmarks.direct_bonus')}
            </td>

            <td className='bg-gray-1000 text-white text-right'>$500</td>
          </tr>

          <tr>
            <td className='px-2'>{t('bonusBenchmarks.upline_bonus')}</td>
            <td className='bg-gray-1000 text-white text-right'>$500</td>
          </tr>
        </tbody>
      </table>

      <table className='table-auto w-full mt-4 bg-white'>
        <thead className='bg-zinc-200'>
          <tr>
            <th className='bg-white'></th>
            <th>{t('bonusBenchmarks.track_bonus')}</th>
            <th className='bg-gray-1000 text-white'>$5,000&nbsp;&nbsp;</th>
          </tr>
        </thead>

        <tbody>
          <tr className='border-b border-zinc-300'>
            <td rowSpan={2} className='border-r border-zinc-300 text-lg font-semibold text-center pb-4 px-2'>
              <Trans i18nKey='bonusBenchmarks.get_n' components={{ br: <br /> }} values={{ n: 10 }} />
            </td>

            <td className='px-2'>
              {t('bonusBenchmarks.direct_bonus')}
            </td>

            <td className='bg-gray-1000 text-white text-right'>$3,000</td>
          </tr>

          <tr>
            <td className='px-2'>{t('bonusBenchmarks.upline_bonus')}</td>
            <td className='bg-gray-1000 text-white text-right'>$2,000</td>
          </tr>
        </tbody>
      </table>

      <table className='table-auto w-full mt-4 bg-white'>
        <thead className='bg-zinc-200'>
          <tr>
            <th className='bg-white'></th>
            <th>{t('bonusBenchmarks.track_bonus')}</th>
            <th className='bg-gray-1000 text-white'>$16,000</th>
          </tr>
        </thead>

        <tbody>
          <tr className='border-b border-zinc-300'>
            <td rowSpan={2} className='border-r border-zinc-300 text-lg font-semibold text-center pb-4 px-2'>
                <Trans i18nKey='bonusBenchmarks.get_n' components={{ br: <br /> }} values={{ n: 20 }} />
            </td>

            <td className='px-2'>
              {t('bonusBenchmarks.direct_bonus')}
            </td>

            <td className='bg-gray-1000 text-white text-right'>$10,000</td>
          </tr>

          <tr>
            <td className='px-2'>{t('bonusBenchmarks.upline_bonus')}</td>
            <td className='bg-gray-1000 text-white text-right'>$6,000</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
