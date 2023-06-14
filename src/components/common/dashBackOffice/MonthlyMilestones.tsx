import { CustomCheckBoxCheckedMilestone, CustomCheckBoxUnCheckedMilestone } from '../CustomCheckBoxMilestone'
import { MonthlyMilestoneResponse, PersonalVolumeInfo } from 'pages/backOfficeDashboard'

const Active = ({ pvVal }: { pvVal: number }) => {
  const label = 'Active 100pv'
  if (pvVal >= 100) {
    return (<CustomCheckBoxCheckedMilestone checkBoxSize={55} labelSize='lg' label={label} />)
  } else {
    return (<CustomCheckBoxUnCheckedMilestone labelSize='lg' checkBoxSize={55} label={label} />)
  }
}

const Binary = ({ activeLeftLeg, activeRightLeg }:
  { activeLeftLeg: boolean, activeRightLeg: boolean }) => {
  const label = 'Binary'
  if ((activeLeftLeg && activeRightLeg)) {
    return (<CustomCheckBoxCheckedMilestone labelSize='lg' checkBoxSize={55} label={label} />)
  } else {
    return (<CustomCheckBoxUnCheckedMilestone labelSize='lg' checkBoxSize={55} label={label} />)
  }
}

const VolumeBanking = ({ pvValLastMonth, pvValCurrentMonth }:
  { pvValLastMonth: number, pvValCurrentMonth: number }) => {
  const label = 'Volume Banking'
  if (pvValLastMonth >= 100 || pvValCurrentMonth >= 100) {
    return (<CustomCheckBoxCheckedMilestone labelSize='lg' checkBoxSize={55} label={label} />)
  } else {
    return (<CustomCheckBoxUnCheckedMilestone labelSize='lg' checkBoxSize={55} label={label} />)
  }
}

export default function MonthlyMilestones ({ dataPV, dataMM }: {dataPV: PersonalVolumeInfo, dataMM: MonthlyMilestoneResponse}) {
  return (
    <>
      {
        dataPV && <div className="w-full max-w-full p-4 space-y-2 bg-white rounded-xl mt-4">
          <h1 className="text-lg text-gray-800 font-semibold">Monthly Milestones</h1>
          <div className="p-0 flex flex-row md:p-2 items-start">
            <div className="flex flex-col items-center">
              <div>
                <div>
                  <Active pvVal={dataPV?.pvValue}/>
                </div>
                <div>
                  <Binary activeLeftLeg={dataMM?.activeLeftLeg} activeRightLeg={dataMM?.activeRightLeg}/>
                </div>
                <div>
                  <VolumeBanking pvValCurrentMonth={dataPV?.pvValue} pvValLastMonth={dataMM?.pvLastMonth} />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
