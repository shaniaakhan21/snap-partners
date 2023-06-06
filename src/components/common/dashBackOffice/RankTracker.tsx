import { Checkbox } from '@mui/material'
import { legValues, rtData, rankValues } from './MockMilestones'
import { useState, useEffect } from 'react'
import { PVProgress } from './CustomCircularProgress'
import TotalLeg from './TotalLegComp'

interface CheckboxWithTextProps {
  defaultChecked?: boolean;
  restProps?: any;
  color?: string;
  primaryColor?: string;
  text: string;
  subText: string;
}

const CheckboxWithText = ({
  defaultChecked = false,
  restProps = {},
  color = '#9D9D9D',
  primaryColor = '#54A52C',
  text,
  subText
} : CheckboxWithTextProps) => {
  return (
    <div className="flex flex-row items-center mb-4">
      <div className='h-fit'>
        <Checkbox
          defaultChecked={defaultChecked}
          {...restProps}
          color="primary"
          sx={{
            color,
            padding: 0,
            '&.Mui-checked': {
              color: primaryColor,
              border: 'none!important',
              padding: 0
            },
            '&.Mui-unchecked': {
              padding: 0
            },
            '& .MuiSvgIcon-root': { fontSize: 30 }
          }}
        />
      </div>
      <div className="flex flex-col pl-1">
        <p className="text-sm text-start">{text}</p>
        <p className="text-xs text-start text-gray-600">{subText}</p>
      </div>
    </div>
  )
}

interface RtInterface {
  rtPercentage: number
  rtNumber: string
}

interface WbLegInterface {
  legValue: string
  legVLabel: string
}

interface rankInterface {
  rankValue: string
  rankLabel: string
}

export default function WeeklyBinary (...restProps: any[]) {
  const [rData, setRtData] = useState<RtInterface[]>([])
  const [legValuesData, setLegValuesData] = useState<WbLegInterface[]>([])
  const [rankData, setrankData] = useState<rankInterface[]>([])

  useEffect(() => {
    setLegValuesData(legValues as unknown as WbLegInterface[])
    setrankData(rankValues as unknown as rankInterface[])
    const details = rtData
    setRtData(details)
  }, [])

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
            {rankData.map(item => (
              <CheckboxWithText
                key={item.rankValue}
                defaultChecked
                restProps={restProps}
                text={item.rankValue}
                subText={item.rankLabel}
              />
            ))}
            <div className="flex flex-col px-4 py-1 mt-3 rounded-lg" style={{ backgroundColor: 'rgb(239 239 239)' }}>
              {
                legValuesData && <div className="flex flex-col w-full">
                  {
                    legValuesData.map(leg =>
                      <TotalLeg legValue={leg.legValue} legVLabel={leg.legVLabel} />)
                  }
                </div>
              }
            </div>
          </div>
          <div className="flex flex-col w-2/5 items-center pl-2 pt-3">
            {/* <PVProgress color="#FFBE9D" transformStyle="rotate(120deg)" data={rData} /> */}
            {rData.map((item) => (
              <h1 className="text-md text-center pt-2">{item.rtNumber}% to Diamond</h1>
            ))}
          </div>
        </div>
        <p className="text-xs text-start text-gray-800 text-center pt-3">Diamond=25,500qv 17,000qv / 8,500qv</p>
      </div>
    </>
  )
}
