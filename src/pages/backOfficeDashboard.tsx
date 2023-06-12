import MonthlyMilestones from 'components/common/dashBackOffice/MonthlyMilestones'
import WeeklyBinary from 'components/common/dashBackOffice/WeeklyBinary'
import RankTracker from 'components/common/dashBackOffice/RankTracker'
import MonthlyCustomerTracking from 'components/common/dashBackOffice/MonthlyCustomerTracking'
import CustomerGlobalPool from 'components/common/dashBackOffice/CustomerGlobalPool'
import { makeStyles } from '@material-ui/core/styles'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import PVComponent from 'components/common/dashBackOffice/PersonalVolume'
import { useAuthStore } from 'lib/stores'
import { useEffect, useState } from 'react'

export interface PersonalVolumeInfo {
  pvValue: number,
  pvPercentage: number
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
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/3 lg:m-0 p-1">
          <PVComponent data={personalVolData}/>
          {auth?.id === 11462407 && <MonthlyMilestones data={personalVolData}/>}
        </div>
        <div className="w-full lg:w-1/3 lg:m-0 p-1">
          <WeeklyBinary/>
          {/*
          <RankTracker/> */}
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
