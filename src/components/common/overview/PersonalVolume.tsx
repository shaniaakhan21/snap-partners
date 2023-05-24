import CircularProgress from '@mui/material/CircularProgress'

export default function PVComponent () {
  return (
    <div className="w-full max-w-xs p-4 space-y-2 h-fit bg-white rounded-xl">
      <h1 className="text-lg text-gray-800 font-semibold ">Personale Volume (pv)</h1>
      <div className="p-0 flex flex-row items-start">
        <div className="flex flex-col items-center w-1/2 h-3/5">
          <div>
            <p className="text-xs text-textAcent-500">View Order History</p>
          </div>
          <div className='ml-0'>
            <PVProgress/>
          </div>
        </div>
        <div className="flex flex-col items-center w-1/2 items-center ">
          <div>
            <p className="text-3xl text-gray-800 font-bold p-2">112pv</p>
          </div>
          <div>
            <p className="text-xs text-gray-800 pb-6">Active= 100pv/month</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export function PVProgress () {
  return (
    <div className="flex items-center">
      <div className="m-2 h-20">
        <CircularProgress
          size={85}
          thickness={4}
          value={100}
          style={{ color: '#82B254' }}
          variant="determinate"
        />
        <div
          style={{
            position: 'relative',
            bottom: '48px',
            left: '70%',
            transform: 'translate(-50%, -50%)',
            fontSize: '20px',
            fontWeight: 'bold'
          }}
        >
          100%
        </div>
      </div>
    </div>
  )
}
