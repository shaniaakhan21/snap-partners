import MonthlyMilestones from 'components/common/dashBackOffice/MonthlyMilestones'
import WeeklyBinary from 'components/common/dashBackOffice/WeeklyBinary'
import MonthlyCustomerTracking from 'components/common/dashBackOffice/MonthlyCustomerTracking'
import { makeStyles } from '@material-ui/core/styles'
import PVComponent from 'components/common/dashBackOffice/PersonalVolume'
import CustomerGlobalPool from 'components/common/dashBackOffice/CustomerGlobalPool'
import RankTracker from 'components/common/dashBackOffice/RankTracker'
import { useAuthStore } from 'lib/stores'
import { useEffect, useState } from 'react'

export interface PersonalVolumeInfo {
  pvValue: number,
  pvPercentage: number,
  leftQV: number,
  rightQV: number
  customers:any

}

export interface MonthlyMilestoneResponse {
  pvLastMonth: number,
  leftLegQVTot: number,
  rightLegQVTot: number,
  activeLeftLeg: boolean,
  activeRightLeg: boolean,
}

const useStyles = makeStyles({
  customIcon: {
    color: 'white',
    fontSize: '15px'
  }
})

const TotalLeg = ({ viewing }: { viewing: string}) => {
  const { auth } = useAuthStore()
  const classes = useStyles()
  const [personalVolData, setPersonalVolData] = useState<PersonalVolumeInfo>()

  useEffect(() => {
    fetch(`/api/ibo/personal/pvInfo?viewing=${viewing}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${auth.accessToken}` }
    }).then((response) => {
      response.json().then((data) => {
        setPersonalVolData(data.data)
      })
    })
  }, [viewing])

  const [monthlyMilestoneData, setMonthlyMilestoneData] = useState<MonthlyMilestoneResponse>()
  useEffect(() => {
    fetch(`/api/ibo/personal/monthlyMilestones?viewing=${viewing}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${auth.accessToken}` }
    }).then((response) => {
      response.json().then((data) => {
        setMonthlyMilestoneData(data.data)
      })
    })
  }, [viewing])

  const [data, setData] = useState()
  const [rows, setRows] = useState([])
  useEffect(() => {
    fetch(`/api/ibo/customer/tracking?viewing=${viewing}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${auth.accessToken}` }
    }).then((response) => {
      response.json().then((data) => {
        setData(data.data)
        setRows(data.data.customers)
      })
    })
  }, [viewing])

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/3 lg:m-0 p-1">
          <PVComponent data={personalVolData}/>
          <MonthlyMilestones dataPV={personalVolData} dataMM={monthlyMilestoneData} />
        </div>
        <div className="w-full lg:w-1/3 lg:m-0 p-1">
          <WeeklyBinary/>
          <RankTracker pvInfoCurrentMonth={personalVolData} monthlyMilestoneData={monthlyMilestoneData}/>
        </div>
        <div className="w-full lg:w-1/3 lg:m-0 p-1">
          <MonthlyCustomerTracking data={data} rows={rows} />
          <CustomerGlobalPool data={data} />
        </div>
      </div>
    </>
  )
}

export default TotalLeg
