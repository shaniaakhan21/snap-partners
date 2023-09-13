import { Checkbox } from '@mui/material'
import StarCheck from './StarCheck'

const TopSection = () => (
  <div className='px-8 py-10 pb-11'>
    <p className="text-2xl text-black font-semibold pl-2">You do 5&1</p>
    <div className='flex flex-row items-center'>
      <Checkbox
        defaultChecked
        sx={{
          '& .MuiSvgIcon-root': { fontSize: 30 },
          color: '#edd607',
          '&.Mui-checked': {
            color: '#FFE500'
          }
        }}
      />
      <p className="text-lg text-black font-medium">Acquire a qualified ERC Client <span className='text-base text-gray-600'>(min 20 W-2's) </span></p>
    </div>
    <div className='flex flex-row items-center'>
      <Checkbox
        defaultChecked
        sx={{
          '& .MuiSvgIcon-root': { fontSize: 30 },
          color: '#6AB63C',
          '&.Mui-checked': {
            color: '#79CC47'
          }
        }}
      />
      <p className="text-lg text-black font-medium">Personally sponsor 5 IBO's </p>
    </div>
    <br></br>
    <p className="text-2xl text-black font-semibold pl-2">Help a directly sponsored friend (IBO) do 5&1 </p>
    <div className='flex flex-row items-center  mt2'>
      <Checkbox
        defaultChecked
        sx={{
          '& .MuiSvgIcon-root': { fontSize: 30 },
          color: '#6AB63C',
          '&.Mui-checked': {
            color: '#79CC47'
          }
        }}
      />
      <p className="text-lg text-black font-medium"><span className='font-bold'>Friend</span> - Acquires a qualified ERC Client <span className='text-base text-gray-600'>(min 20 W-2's) </span> </p>
    </div>
    <div className='flex flex-row items-center'>
      <Checkbox
        defaultChecked
        sx={{
          '& .MuiSvgIcon-root': { fontSize: 30 },
          color: '#6AB63C',
          '&.Mui-checked': {
            color: '#79CC47'
          }
        }}
      />
      <p className="text-lg text-black font-medium "><span className='font-bold'>Friend</span> - Personally sponsors 5 IBO's</p>
    </div>
    <br></br>
    <p className="text-2xl text-black font-semibold pl-2">Friend helps a directly sponsored Friend</p>
    <div className='flex flex-row align-start'>
      <Checkbox
        defaultChecked
        sx={{
          '& .MuiSvgIcon-root': { fontSize: 30 },
          paddingTop: 0,
          color: '#6AB63C',
          '&.Mui-checked': {
            color: '#79CC47'
          }
        }}
      />
      <p className="text-lg text-black font-medium mt-2"><span className='font-bold'>Friend</span> - Helps one of their personally sponsored IBO’s acquire a qualified ERC Client  <span className='text-base text-gray-600'>(on your level 2)</span> </p>
    </div>
    <div className='w-1/4 mt-8 ml-3'>
      <StarCheck
        backgroundColor='bg-custom-green'
        borderIt='border-it-green'
        checkboxColor='#6AB63C'
        checkboxCheckedColor='#79CC47'
        text='1'
        textColor='text-white' checked={true}/>
    </div>
  </div>
)

export default TopSection
