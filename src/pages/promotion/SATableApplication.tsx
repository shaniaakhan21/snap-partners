import { useEffect, useState } from 'react'
import StarAchieverTable from './StarAchieverTable'

const SATableApplication = () => {
  const [tableConfigs, setTableConfigs] = useState([])

  useEffect(() => {
    const fetchedTableConfigs = [
      {
        title: '1 Star Achievers',
        rows: [
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
        ],
        columns: [
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
      },
      {
        title: '2 Star Achievers',
        rows: [
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
        ],
        columns: [
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
      },
      {
        title: '3 Star Achievers',
        rows: [
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
        ],
        columns: [
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
      },
      {
        title: '4 Star Achievers',
        rows: [
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
        ],
        columns: [
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
      },
      {
        title: '5 Star Achievers',
        rows: [
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
        ],
        columns: [
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
      }

    ]
    setTableConfigs(fetchedTableConfigs)
  }, [])

  return (
    <div className='w-full'>
      {tableConfigs.map((config, index) => (
        <StarAchieverTable key={index} {...config} />
      ))}
    </div>
  )
}

export default SATableApplication
