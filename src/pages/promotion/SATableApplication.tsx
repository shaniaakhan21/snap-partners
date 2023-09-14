import { useEffect, useState } from 'react'
import StarAchieverTableClient from './StarAchieverTableClient'
import tableData from './tableData.json'
const SATableApplication = () => {
  const [tableConfigs, setTableConfigs] = useState([])

  useEffect(() => {
    setTableConfigs(tableData)
  }, [])

  return (
    <div className='w-full'>
      {tableConfigs.map((config, index) => (
        <StarAchieverTableClient key={index} {...config} />
      ))}
    </div>
  )
}

export default SATableApplication
