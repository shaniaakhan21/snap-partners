import MonthlyMilestones from 'components/common/dashBackOffice/MonthlyMilestones'
import WeeklyBinary from 'components/common/dashBackOffice/WeeklyBinary'
import MonthlyCustomerTracking from 'components/common/dashBackOffice/MonthlyCustomerTracking'
import { makeStyles } from '@material-ui/core/styles'
import PVComponent from 'components/common/dashBackOffice/PersonalVolume'
import RankTracker from 'components/common/dashBackOffice/RankTracker'
import { useAuthStore } from 'lib/stores'
import { useEffect, useState } from 'react'

export interface PersonalVolumeInfo {
  pvValue: number,
  pvPercentage: number,
  leftQV: number,
  rightQV: number

}

export interface MonthlyMilestoneResponse {
  pvLastMonth: number,
  leftLegQVTot: number,
  rightLegQVTot: number,
  status: {
    isAtLeastOne: true,
    isAtLeastTwo: false
  } // has personally sponsored IBO on the left and right binary each have 100PV
}

const useStyles = makeStyles({
  customIcon: {
    color: 'white',
    fontSize: '15px'
  }
})

const TotalLeg = () => {
  const { auth } = useAuthStore()
  const classes = useStyles()
  const [personalVolData, setPersonalVolData] = useState<PersonalVolumeInfo>()

  useEffect(() => {
    fetch('/api/ibo/personal/pvInfo', {
      method: 'GET',
      headers: { Authorization: `Bearer ${auth.accessToken}` }
    }).then((response) => {
      response.json().then((data) => {
        setPersonalVolData(data.data)
      })
    })
  }, [])

  const [monthlyMilestoneData, setMonthlyMilestoneData] = useState<MonthlyMilestoneResponse>()
  useEffect(() => {
    fetch('/api/ibo/personal/monthlyMilestones', {
      method: 'GET',
      headers: { Authorization: `Bearer ${auth.accessToken}` }
    }).then((response) => {
      response.json().then((data) => {
        setMonthlyMilestoneData(data.data)
      })
    })
  }, [])
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/3 lg:m-0 p-1">
          <PVComponent data={personalVolData}/>
          <MonthlyMilestones dataPV={personalVolData} dataMM={monthlyMilestoneData} />
        </div>
        <div className="w-full lg:w-1/3 lg:m-0 p-1">
          <WeeklyBinary/>
          {auth?.id === 11462407 && <RankTracker pvInfoCurrentMonth={personalVolData} monthlyMilestoneData={monthlyMilestoneData} currentRank={auth?.ranks?.type}/> }
        </div>
        <div className="w-full lg:w-1/3 lg:m-0 p-1">
          <MonthlyCustomerTracking/>
          {/* <CustomerGlobalPool/>
          <button className="rounded-full bg-primary-500 w-full max-w-3xl flex flex-row items-center justify-center mt-4">
            <p className='text-xs text-white font-medium p-2 uppercase'>Visit Snap Services Dashboard</p>
            <ArrowForwardIcon className={classes.customIcon} />
          </button> */}
        </div>
      </div>
    </>
  )
}

export default TotalLeg
