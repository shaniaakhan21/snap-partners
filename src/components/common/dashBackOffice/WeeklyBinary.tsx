import CustomCardWeeklyBinary from '../CustomCardWeeklyBinary'
import { legValues, legTable, priceValue } from './MockMilestones'
import { useState, useEffect } from 'react'
import TotalLeg from './TotalLegComp'

interface WbLegInterface {
  legValue: string
  legVLabel: string
}

interface WbLegtableInterface {
  legName: string
  legCVvalue: string
}

interface WbpriceInterface {
  price:number
}

export default function WeeklyBinary () {
  const [legValuesData, setLegValuesData] = useState<WbLegInterface[]>([])
  const [legTableData, setLegTableData] = useState<WbLegtableInterface[]>([])
  const [priceData, setPriceData] = useState<WbpriceInterface[]>([])

  useEffect(() => {
    setLegValuesData(legValues as unknown as WbLegInterface[])
    setLegTableData(legTable as unknown as WbLegtableInterface[])
    setPriceData(priceValue as unknown as WbpriceInterface[])
  }, [])

  return (
    <>
      <div className="w-full max-w-full p-4 space-y-2 h-fit bg-white rounded-xl">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="text-lg text-gray-800 font-semibold">Weekly Binary</h1>
          </div>
          <div>
            <p className="text-xs text-textAcent-500">View Requirements</p>
          </div>
        </div>
        {
          legTableData && <div className="flex flex-row">
            {legTable.map(item =>
              <CustomCardWeeklyBinary legName={item.legName} legCVvalue={item.legCVvalue} rollovervalue={item.rollovervalue} totalValue={item.totalValue} />
            )}
          </div>
        }
        <div>
          <h1 className="text-base text-gray-800 font-medium text-center">In 8 Cycles</h1>
          <div className="flex flex-row align-start w-full p-1">
            {
              legValuesData && <div className="flex flex-col w-1/2">
                {
                  legValuesData.map(leg =>
                    <TotalLeg legValue={leg.legValue} legVLabel={leg.legVLabel} />)
                }
              </div>
            }

            {
              priceData && <div className='w-1/2 pt-4'>
                {
                  priceData.map(leg =>
                    <p className="text-3xl text-black-800 font-bold p-2">$ {leg.price}</p>)
                }
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}
