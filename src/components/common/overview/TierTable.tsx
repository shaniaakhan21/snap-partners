interface TierTableRow {
    title: string
    values: string[]
}

const rows: TierTableRow [] = [
  {
    title: 'Tier1',
    values: ['10%', '10%', '10%', '10%']
  },
  {
    title: 'Tier2',
    values: ['1%', '5%', '5%', '5%']
  },
  {
    title: 'Tier3',
    values: ['1%', '2%', '5%', '5%']
  },
  {
    title: 'Tier4',
    values: ['1%', '2%', '3%', '5%']
  },
  {
    title: 'Tier5',
    values: ['1%', '2%', '3%', '5%']
  },
  {
    title: 'Infinite',
    values: ['', '1%', '1%', '2%']
  },
  {
    title: '1er Gen',
    values: ['', '', '1%', '2%']
  },
  {
    title: '2er Gen',
    values: ['', '', '', '1%']
  }
]

export default function TierTable () {
  const renderRow = (row: TierTableRow) => {
    return (
      <tr key={row.title}>
        <td className="text-left text-xs sm:text-base">{row.title}</td>
        {row.values.map((value, idx) => (
          <td key={`${row.title}${value}${idx}`} className="text-xs sm:text-base">
            {value}
          </td>
        ))}
      </tr>
    )
  }

  return (
    <div className="bg-white rounded-lg py-3 px-2">
      <table className="table-fixed w-full text-center">
        <thead>
          <tr>
            <th className="text-left text-xs sm:text-base">Team</th>
            <th className="text-xs sm:text-base">Manager</th>
            <th className="text-xs sm:text-base">Supervisor</th>
            <th className="text-xs sm:text-base">Director</th>
            <th className="text-xs sm:text-base">Executive</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(renderRow)}
        </tbody>
      </table>
    </div>
  )
}
