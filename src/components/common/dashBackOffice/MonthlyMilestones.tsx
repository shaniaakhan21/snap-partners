import { useEffect, useState } from 'react'
import { CustomCheckBoxCheckedMilestone, CustomCheckBoxUnCheckedMilestone } from '../CustomCheckBoxMilestone'
import { PersonalVolumeInfo } from 'pages/backOfficeDashboard'
import { useAuthStore } from 'lib/stores'

const Active = ({ pvVal }: { pvVal: number }) => {
  if (pvVal >= 100) {
    return (<CustomCheckBoxCheckedMilestone label={'Active 100pv'} />)
  } else {
    return (<CustomCheckBoxUnCheckedMilestone label={'Active 100pv'} />)
  }
}

const Binary = ({ pvValLastMonth, pvValCurrentMonth, hasPSIBO }:
  { pvValLastMonth: number, pvValCurrentMonth: number, hasPSIBO: boolean }) => {
  if ((pvValLastMonth >= 100 || pvValCurrentMonth >= 100) && hasPSIBO) {
    return (<CustomCheckBoxCheckedMilestone label={'Binary'} />)
  } else {
    return (<CustomCheckBoxUnCheckedMilestone label={'Binary'} />)
  }
}

const VolumeBanking = ({ pvValLastMonth, pvValCurrentMonth }:
  { pvValLastMonth: number, pvValCurrentMonth: number }) => {
  if (pvValLastMonth >= 100 || pvValCurrentMonth >= 100) {
    return (<CustomCheckBoxCheckedMilestone label={'Volume Banking'} />)
  } else {
    return (<CustomCheckBoxUnCheckedMilestone label={'Volume Banking'} />)
  }
}

export interface MonthlyMilestoneResponse {
  pvLastMonth: number,
  hasPSIBO: boolean // has personally sponsored IBO on the left and right binary each have 100PV
}

export default function MonthlyMilestones ({ data }: {data: PersonalVolumeInfo}) {
  const [monthlyMilestoneData, setMonthlyMilestoneData] = useState<MonthlyMilestoneResponse>()
  const { auth } = useAuthStore()
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
      {
        data && <div className="w-full max-w-full p-4 space-y-2 bg-white rounded-xl mt-4">
          <h1 className="text-lg text-gray-800 font-semibold">Monthly Milestones</h1>
          <div className="p-0 flex flex-row md:p-2 items-start">
            <div className="flex flex-col items-center">
              <div>
                <div>
                  <Active pvVal={data?.pvValue}/>
                </div>
                <div>
                  <Binary pvValLastMonth={monthlyMilestoneData?.pvLastMonth}
                    pvValCurrentMonth={data?.pvValue}
                    hasPSIBO={monthlyMilestoneData?.hasPSIBO}/>
                </div>
                <div>
                  <VolumeBanking pvValCurrentMonth={data?.pvValue} pvValLastMonth={monthlyMilestoneData?.pvLastMonth} />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
