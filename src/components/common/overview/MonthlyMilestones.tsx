import CustomCheckBoxMilestone from '../CustomCheckBoxMilestone'

export default function MonthlyMilestones () {
  const options = ['Active 100pv', 'Binary', 'Volume Banking'];
  return (
    <div className="w-full max-w-xs p-4 space-y-2 bg-white rounded-xl mt-4">
      <h1 className="text-lg text-gray-800 font-semibold ">Monthly Milestones</h1>
      <div className="p-0 flex flex-row md:p-2 items-start">
        <div className="flex flex-col items-center">
          <div>
            <div>
              {options.map((option, index) => (
                <CustomCheckBoxMilestone key={index} label={option} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
