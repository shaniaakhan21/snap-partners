import { useEffect, useState } from 'react'
import CustomCheckBoxMilestone from '../CustomCheckBoxMilestone'
import { milestonesData } from './MockMilestones'

interface MilestonesInterface {
  id: string;
  label: string;
}

export default function MonthlyMilestones () {
  const [data, setData] = useState<Array<MilestonesInterface>>()

  useEffect(() => {
    const details = milestonesData as unknown as Array<MilestonesInterface>
    setData(details)
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
                  {
                    data.map(item =>
                      <CustomCheckBoxMilestone key={item.id} label={item.label} />)
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
