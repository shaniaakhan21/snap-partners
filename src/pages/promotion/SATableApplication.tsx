import StarAchieverTable from './StarAchieverTable'

const SATableApplication = () => {
  const rows = [
    {
      name: 'Edwin Zam',
      date: new Date('2023-05-21'),
      id: 1
    },
    {
      name: 'John Smith',
      date: new Date('2023-05-21'),
      id: 2
    },
    {
      name: 'Richard Williams',
      date: new Date('2023-05-21'),
      id: 3
    }
  ]

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1
    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      flex: 1
    }
  ]

  return (
    <div className='w-full'>
      <StarAchieverTable title={'1 Star Achievers'} rows={rows} columns={columns} />
    </div>
  )
}

export default SATableApplication
