import TotalLeg from './TotalLegComp'
import { CustomCheckBoxCheckedMilestone, CustomCheckBoxUnCheckedMilestone } from '../CustomCheckBoxMilestone'
import { MonthlyMilestoneResponse, PersonalVolumeInfo } from 'pages/backOfficeDashboard'
import { PVProgress } from './CustomCircularProgress'
import { rankCriteria } from './ranks'
import { useEffect, useState } from 'react'

const Personal = ({ pvVal }: { pvVal: number }) => {
  const label = 'Personal 100pv'
  if (pvVal >= 100) {
    return (<CustomCheckBoxCheckedMilestone checkBoxSize={20} labelSize='sm' label={label} />)
  } else {
    return (<CustomCheckBoxUnCheckedMilestone checkBoxSize={20} labelSize='sm' label={label} />)
  }
}

const ActiveLL = ({ activeLeftLeg }:
  { activeLeftLeg: boolean }) => {
  const label = 'Active-100pv Left Leg'
  if (activeLeftLeg) {
    return (<CustomCheckBoxCheckedMilestone checkBoxSize={20} labelSize='sm' label={label} />)
  } else {
    return (<CustomCheckBoxUnCheckedMilestone checkBoxSize={20} labelSize='sm' label={label} />)
  }
}

const ActiveRL = ({ activeRightLeg }:
  { activeRightLeg: boolean }) => {
  const label = 'Active-100pv Right Leg'
  if (activeRightLeg) {
    return (<CustomCheckBoxCheckedMilestone checkBoxSize={20} labelSize='sm' label={label} />)
  } else {
    return (<CustomCheckBoxUnCheckedMilestone checkBoxSize={20} labelSize='sm' label={label} />)
  }
}

const calculateCompletionPercentageAndNextRank = (currentRank: string, totalLeftLeg: number, totalRightLeg: number): {
  percentage: number, nextRank: string, teamVol: number, nonPowerLeg: number, powerLeg: number
} => {
  const rankKeys = Object.keys(rankCriteria)
  let teamVol = null
  let nonPowerLeg = null
  let powerLeg = null
  let percentage = null
  let nextRank = ''
  rankKeys.forEach((rank, index) => {
    if (rank.toLowerCase() === currentRank.toLocaleLowerCase()) {
      if (index !== -1 && index < rankKeys.length - 1) {
        nextRank = rankKeys[index + 1]
        teamVol = rankCriteria[nextRank]?.teamVolume
        nonPowerLeg = rankCriteria[nextRank]?.qvNonPL
        powerLeg = rankCriteria[nextRank]?.qvPL
        percentage = Math.round(((totalLeftLeg / powerLeg) + (totalRightLeg / nonPowerLeg)) * 100)
      }
    }
  })
  return {
    percentage: percentage,
    nextRank: nextRank,
    teamVol: teamVol,
    nonPowerLeg: nonPowerLeg,
    powerLeg: powerLeg
  }
}

export default function RankTracker ({ pvInfoCurrentMonth, monthlyMilestoneData, currentRank }:
  {pvInfoCurrentMonth: PersonalVolumeInfo, monthlyMilestoneData: MonthlyMilestoneResponse, currentRank: string}) {
  const [processedData, setPercentage] = useState({ percentage: 0, nextRank: '', teamVol: 0, nonPowerLeg: 0, powerLeg: 0 })
  useEffect(() => {
    const data = calculateCompletionPercentageAndNextRank(currentRank, monthlyMilestoneData?.leftLegQVTot, monthlyMilestoneData?.rightLegQVTot)
    setPercentage({ ...data })
  }, [monthlyMilestoneData, currentRank])
  return (
    <>
      <div className="w-full max-w-full p-4 space-y-2 h-fit bg-white rounded-xl  mt-4">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="text-lg text-gray-800 font-semibold">Rank Tracker</h1>
          </div>
          <div>
            <p className="text-xs text-textAcent-500">Rank Requirements</p>
          </div>
        </div>
        <div className="flex flex-row justify-between  w-full">
          <div className="flex flex-col">
            <Personal pvVal={pvInfoCurrentMonth?.pvValue} />
            <ActiveLL activeLeftLeg={monthlyMilestoneData?.activeLeftLeg}/>
            <ActiveRL activeRightLeg={monthlyMilestoneData?.activeRightLeg}/>
            <div className="flex flex-col px-4 py-1 mt-3 rounded-lg" style={{ backgroundColor: 'rgb(239 239 239)' }}>
              {
                monthlyMilestoneData?.leftLegQVTot && <div className="flex flex-col w-full">
                  <TotalLeg legValue={monthlyMilestoneData?.leftLegQVTot} legVLabel={'Total Left Leg (QV)'} />
                  <TotalLeg legValue={monthlyMilestoneData?.rightLegQVTot} legVLabel={'Total Right Leg (QV)'} />
                </div>
              }
            </div>
          </div>
          <div className="flex flex-col w-2/5 items-center pl-2 pt-3">
            <PVProgress color="#FFBE9D" transformStyle="rotate(120deg)" percentage={processedData?.percentage} />
            <h1 className="text-md text-center pt-2">{processedData?.percentage}% to {processedData?.nextRank}</h1>
          </div>
        </div>
        <p className="text-xs text-start text-gray-800 text-center pt-3">{processedData?.nextRank}={processedData?.teamVol}qv {processedData?.powerLeg}qv / {processedData?.nonPowerLeg}qv</p>
      </div>
    </>
  )
}
