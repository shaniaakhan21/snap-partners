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

const calculateCurrentRank = (currentLeftTot: number, currentRightTot: number, isActiveLeft: boolean, isActiveRight: boolean, pvVal: number): string => {
  const entries = Object.entries(rankCriteria)

  let currentRole = ''
  const [initialKey, initialEntry] = entries[0]
  const [lastKey, lastEntry] = entries[entries.length - 1]


  const minLeg = Math.min(currentLeftTot, currentRightTot)
  const maxLeg = Math.max(currentLeftTot, currentRightTot)

  if (minLeg < initialEntry?.qvNonPL || maxLeg < initialEntry?.qvPL || !isActiveLeft || !isActiveRight || pvVal < 100) {
    return currentRole
  }

  if (minLeg >= lastEntry?.qvNonPL && maxLeg >= lastEntry?.qvPL && isActiveLeft && isActiveRight && pvVal >= 100) {
    return lastKey
  }

  for (let i = 0; i < entries.length; i++) {
    const [currentKey, currentCriteria] = entries[i]
    const nextIndex = i + 1
    if (entries.length > nextIndex) {
      const [nextKey, nextCriteria] = entries[nextIndex]
      if (minLeg < nextCriteria?.qvNonPL || maxLeg < nextCriteria?.qvPL) {
        if (isActiveLeft && isActiveRight && pvVal >= 100) {
          currentRole = currentKey
        }
        break
      }
    }
  }
  return currentRole
}

const calculatePercentage = (adjustedTotLL: number, powerLeg: number, adjustedTotRL: number,
  nonPowerLeg: number, adjustedPV: number, adjustedActiveLeft: number, adjustedActiveRight: number) => {
  return Math.round((((adjustedTotLL / powerLeg) * 100) +
                    ((adjustedTotRL / nonPowerLeg) * 100) +
                    ((adjustedPV / 100) * 100) +
                    ((adjustedActiveLeft / 100) * 100) +
                    ((adjustedActiveRight / 100) * 100)) / 5)
}

const calculateCompletionPercentageAndNextRank = (currentRank: string, totalLeftLeg: number, totalRightLeg: number, isActiveLeft: boolean, isActiveRight: boolean, pvVal: number): {
  percentage: number, nextRank: string, teamVol: number, nonPowerLeg: number, powerLeg: number
} => {
  const rankKeys = Object.keys(rankCriteria)
  let teamVol = null
  let nonPowerLeg = null
  let powerLeg = null
  let percentage = null
  let nextRank = ''
  if (!currentRank) {
    nextRank = rankKeys[0]
  }
  rankKeys.forEach((rank, index) => {
    if (rank.toLowerCase() === currentRank.toLocaleLowerCase()) {
      if (index !== -1 && index < rankKeys.length - 1) {
        nextRank = rankKeys[index + 1]
        teamVol = rankCriteria[nextRank]?.teamVolume
        nonPowerLeg = rankCriteria[nextRank]?.qvNonPL
        powerLeg = rankCriteria[nextRank]?.qvPL
        const adjustedTotLL = totalLeftLeg > powerLeg ? powerLeg : totalLeftLeg
        const adjustedTotRL = totalRightLeg > nonPowerLeg ? nonPowerLeg : totalRightLeg
        const adjustedPV = pvVal > 100 ? 100 : pvVal
        const adjustedActiveLeft = isActiveLeft ? 100 : 0
        const adjustedActiveRight = isActiveRight ? 100 : 0
        percentage = calculatePercentage(adjustedTotLL, powerLeg, adjustedTotRL, nonPowerLeg, adjustedPV, adjustedActiveLeft, adjustedActiveRight)
      }
    }
    if (nextRank) {
      teamVol = rankCriteria[nextRank]?.teamVolume
      nonPowerLeg = rankCriteria[nextRank]?.qvNonPL
      powerLeg = rankCriteria[nextRank]?.qvPL
      const adjustedTotLL = totalLeftLeg > powerLeg ? powerLeg : totalLeftLeg
      const adjustedTotRL = totalRightLeg > nonPowerLeg ? nonPowerLeg : totalRightLeg
      const adjustedPV = pvVal > 100 ? 100 : pvVal
      const adjustedActiveLeft = isActiveLeft ? 100 : 0
      const adjustedActiveRight = isActiveRight ? 100 : 0
      percentage = calculatePercentage(adjustedTotLL, powerLeg, adjustedTotRL, nonPowerLeg, adjustedPV, adjustedActiveLeft, adjustedActiveRight)
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

export default function RankTracker ({ pvInfoCurrentMonth, monthlyMilestoneData }:
  {pvInfoCurrentMonth: PersonalVolumeInfo, monthlyMilestoneData: MonthlyMilestoneResponse}) {
  const [processedData, setPercentage] = useState({ percentage: 0, nextRank: '', teamVol: 0, nonPowerLeg: 0, powerLeg: 0 })
  useEffect(() => {
    const legLegQVTot = monthlyMilestoneData?.leftLegQVTot
    const rightLegQVTot = monthlyMilestoneData?.rightLegQVTot
    const isActiveLeft = monthlyMilestoneData?.activeLeftLeg
    const isActiveRight = monthlyMilestoneData?.activeRightLeg
    const currentRank = calculateCurrentRank(legLegQVTot, rightLegQVTot, isActiveLeft, isActiveRight, pvInfoCurrentMonth?.pvValue)
    const data = calculateCompletionPercentageAndNextRank(currentRank, legLegQVTot, rightLegQVTot, isActiveLeft, isActiveRight, pvInfoCurrentMonth?.pvValue)
    setPercentage({ ...data })
  }, [monthlyMilestoneData, pvInfoCurrentMonth])
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
              <div className="flex flex-col w-full">
                <TotalLeg legValue={monthlyMilestoneData?.leftLegQVTot} legVLabel={'Total Left Leg (QV)'} />
                <TotalLeg legValue={monthlyMilestoneData?.rightLegQVTot} legVLabel={'Total Right Leg (QV)'} />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-2/5 items-center pl-2 pt-3">
            <PVProgress color="#FFBE9D" transformStyle="rotate(120deg)" percentage={isNaN(processedData?.percentage) ? 0 : processedData?.percentage} />
            <h1 className="text-md text-center pt-2">{isNaN(processedData?.percentage) ? 0 : processedData?.percentage}% to {processedData?.nextRank}</h1>
          </div>
        </div>
        <p className="text-xs text-start text-gray-800 text-center pt-3">{processedData?.nextRank}={processedData?.teamVol}qv {processedData?.powerLeg}qv / {processedData?.nonPowerLeg}qv</p>
      </div>
    </>
  )
}
