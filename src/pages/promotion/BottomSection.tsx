import StarCheck from './StarCheck'

const BottomSection = () => {
  return (
    <div className='px-8 py-10'>
      <p className="text-2xl text-black font-semibold pl-1">Either</p>
      <br></br>
      <div className='flex flex-row items-center pl-2'>
        <p className="text-lg text-black font-medium">a - Personally acquire an additional qualified ERC Client <span className='text-base text-gray-600'>(min 20 W-2's)</span></p>
      </div>
      <div className='flex flex-row items-center pl-2'>
        <p className="text-lg text-black font-medium">b - Help a unique IBO within your first two organization tiers acquire a qualified ERC Client <span className='text-base text-gray-600'>(min 20 W-2's)</span></p>
      </div>
      <br></br>
      <div className='note-border ml-2'>
        <p className="text-sm text-black font-medium p-3 text-center"><b className='uppercase'>Note - </b> Jump a STAR Level each time you accomplish letter 'a' or 'b' in this section</p>
      </div>
      <div className='w-full flex flex-row'>
        <div className='w-1/3 mt-8'>
          <div className='m-6 ml-3'>
            <StarCheck
              checked={true}
              backgroundColor='bg-custom-green'
              borderIt='border-it-green'
              checkboxColor='#6AB63C'
              checkboxCheckedColor='#79CC47'
              text='2'
              textColor='text-white'
            />
          </div>

          <div className='m-6 ml-3'>
            <StarCheck
              checked={false}
              backgroundColor='bg-custom-red'
              borderIt='border-it-red'
              checkboxColor='#CC1D03'
              checkboxCheckedColor='#DD4C37'
              text='5'
              textColor='text-white'
            />
          </div>

          <div className='m-6 ml-3'>
            <StarCheck
              checked={false}
              backgroundColor='bg-custom-red'
              borderIt='border-it-red'
              checkboxColor='#CC1D03'
              checkboxCheckedColor='#DD4C37'
              text='8'
              textColor='text-white'
            />
          </div>
        </div>
        <div className='w-1/3 mt-8 ml-3'>
          <div className='m-6 ml-3'>
            <StarCheck
              checked={false}
              backgroundColor='bg-custom-red'
              borderIt='border-it-red'
              checkboxColor='#CC1D03'
              checkboxCheckedColor='#DD4C37'
              text='3'
              textColor='text-white'
            />
          </div>

          <div className='m-6 ml-3'>
            <StarCheck
              checked={false}
              backgroundColor='bg-custom-red'
              borderIt='border-it-red'
              checkboxColor='#CC1D03'
              checkboxCheckedColor='#DD4C37'
              text='6'
              textColor='text-white'
            />
          </div>

          <div className='m-6 ml-3'>
            <StarCheck
              checked={false}
              backgroundColor='bg-custom-red'
              borderIt='border-it-red'
              checkboxColor='#CC1D03'
              checkboxCheckedColor='#DD4C37'
              text='9'
              textColor='text-white'
            />
          </div>
        </div>
        <div className='w-1/3 mt-8 ml-3'>
          <div className='m-6 ml-3'>
            <StarCheck
              checked={false}
              backgroundColor='bg-custom-red'
              borderIt='border-it-red'
              checkboxColor='#CC1D03'
              checkboxCheckedColor='#DD4C37'
              text='4'
              textColor='text-white'
            />
          </div>

          <div className='m-6 ml-3'>
            <StarCheck
              checked={false}
              backgroundColor='bg-custom-red'
              borderIt='border-it-red'
              checkboxColor='#CC1D03'
              checkboxCheckedColor='#DD4C37'
              text='7'
              textColor='text-white'
            />
          </div>

          <div className='m-6 ml-3'>
            <StarCheck
              checked={false}
              backgroundColor='bg-custom-red'
              borderIt='border-it-red'
              checkboxColor='#CC1D03'
              checkboxCheckedColor='#DD4C37'
              text='10'
              textColor='text-white'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomSection
