import { Spinner } from 'components/common/loaders'
import { useEffect, useState } from 'react'
import { useAuthStore } from 'lib/stores'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'

const columns = [
  { name: 'description', header: 'Filter list by typing description', defaultWidth: 500, flex: 2 },
  {
    name: 'date',
    header: 'Date',
    defaultWidth: 400,
    flex: 1
  }
]

const gridStyle = {
  minHeight: 600
}

const filterValue = [
  { name: 'description', operator: 'contains', type: 'string', value: '' }
]

const TableNotifications = ({ notifications }) => {
  return (
    <div>
      <style>

      </style>
      <ReactDataGrid
        columns={columns}
        dataSource={notifications}
        sortable={false}
        defaultFilterValue={filterValue}
        style={gridStyle}
        defaultLimit={10}
        pagination
        enableColumnAutosize = {false}
      />
    </div>
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
    <div className='w-fit lg:w-full mx-auto bg-white rounded-3xl shadow-lg p-6'>
      <div>
        <span className='text-sm lg:text-xl text-black font-bold '>Network Activity</span>
      </div>
      <div className={`relative w-[834px] lg:w-full sm:rounded-sm  mt-4 ${!loading && 'overflow-x-auto'}`}>
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
