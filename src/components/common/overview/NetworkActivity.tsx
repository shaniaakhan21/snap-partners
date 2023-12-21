import { Spinner } from 'components/common/loaders'
import { useEffect, useState } from 'react'
import { useAuthStore } from 'lib/stores'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'

const columns = [
    { name: 'description', header: 'Activity Description', defaultFlex: 3 },
  {
    name: 'date',
    header: 'Date',
    defaultFlex: 1
  }
]

const gridStyle = { minHeight: 525 }

const filterValue = [
  { name: 'description', operator: 'contains', type: 'string', value: '' }
]

const TableNotifications = ({ notifications }) => {
  return (
    <ReactDataGrid
      columns={columns}
      dataSource={notifications}
      sortable={false}
      defaultFilterValue={filterValue}
      style={gridStyle}
      defaultLimit={10}
      pagination
    />
  )
}

const NetworkActivity = () => {
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState([])
  const { auth } = useAuthStore()

  useEffect(() => {
    (async function () {
      try {
        setLoading(true)
        const res = await fetch('/api/integrous/getNotifications', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json'
          }
        })

        if (res.status === 200) {
          const data = await res.json()
          setNotifications(data)
        }
      } catch (e) {

      }
      setLoading(false)
    })()
  }, [])

  return (
    <div className='max-w-4xl w-full mx-auto bg-white rounded-lg px-2.5 py-3'>
      <div>
        <span className='text-xl text-black font-bold'>Network Activity</span>
      </div>
      <div className={`relative w-full sm:rounded-lg ${!loading && 'overflow-x-auto'}`}> {/* Can be better */}
        {
          loading &&
            (
              <div className='w-full h-screen-80 flex justify-center items-center'>
                <Spinner/>
              </div>
            )
        }
        <>
          {
            !loading &&
              <TableNotifications notifications={notifications} />
          }
        </>
      </div>
    </div>
  )
}
export default NetworkActivity
