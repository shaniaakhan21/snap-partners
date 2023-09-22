import { useState } from 'react'
import ERCTableModal from './ERCTableModal'
import IBOTableModal from './IBOTableModal'
import StarCheck from './StarCheck'

const BottomSection = ({ sprintData }) => {
  const [ercModalData, setErcModalData] = useState(null)

  const refineData = (companies) => {
    if (companies.length > 0) {
      companies = [...companies.filter((element) => (element))].flat()
    }
    console.log("qualifiied NC bottom section", companies)
    return companies
  }
  const [isModalOpen, setModalOpen] = useState(false)

  const handleParagraphClick = (ercData ?: any []) => {
    setErcModalData(ercData)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const [isModalOpenIBO, setModalOpenIBO] = useState(false)

  const handleParagraphClickIBO = () => {
    setModalOpenIBO(true)
  }

  const handleCloseModalIBO = () => {
    setModalOpenIBO(false)
  }
  return (
    <div className='p-2 lg:pl-8 lg:py-10'>
      <p className="text-base lg:text-2xl text-black font-semibold p-2 lg:pl-1">Either</p>
      <div className='flex flex-row items-center p-2 lg:pl-2'>
        <p className="text-sm lg:text-lg text-black font-medium cursor-pointer" onClick={() => handleParagraphClick([...sprintData?.personalQualifiedErcCompanies.slice(1), ...sprintData?.personalNonQualifiedErcCompanies])}>a - Personally acquire an additional qualified ERC Client <span className='text-base text-gray-600'>(min 20 W-2's)</span></p>
      </div>
      <div className='flex flex-row items-center p-2 lg:pl-2'>
        <p className="text-sm lg:text-lg text-black font-medium cursor-pointer" onClick={() => handleParagraphClick(refineData([...sprintData?.friendQualifiedErcArray.slice(1), ...sprintData?.friendNonQualifiedErcCompanies, ...sprintData?.friendOfFriendQualifiedErcArray.slice(1), ...sprintData?.friendOfFriendNonQualifiedErcCompanies]))}>b - Help a <b>unique IBO</b> within your first two organization tiers acquire a qualified ERC Client <span className='text-base text-gray-600'>(min 20 W-2's)</span></p>
      </div>
      <br></br>
      <div className='note-border'>
        <p className="text-xs lg:text-sm text-black font-medium p-2 text-center"><b className='uppercase'>Note - </b>Jump a STAR Level each time you accomplish letter 'a' or 'b' in this section</p>
      </div>
      <div className='w-full flex flex-row'>
        <div className='w-1/3 mt-8'>
          <div className='m-2 xs:m-6 xs:ml-3'>
            <StarCheck
              backgroundColor= {sprintData?.starArray && sprintData?.starArray[1] >= 1 ? 'bg-custom-green' : 'bg-custom-red'}
              borderIt= {sprintData?.starArray && sprintData?.starArray[1] >= 1 ? 'border-it-green' : 'border-it-red'}
              checkboxColor='#6AB63C'
              checkboxCheckedColor='#79CC47'
              text='2'
              textColor='text-white' canToggle={false} accepted={sprintData && sprintData.starArray?.length > 0 && sprintData?.starArray[1] >= 1}/>
          </div>

          <div className='m-2 xs:m-6 xs:ml-3'>
            <StarCheck
              backgroundColor={sprintData?.starArray && sprintData?.starArray[1] >= 4 ? 'bg-custom-green' : 'bg-custom-red'}
              borderIt= {sprintData?.starArray && sprintData?.starArray[1] >= 4 ? 'border-it-green' : 'border-it-red'}
              checkboxColor='#6AB63C'
              checkboxCheckedColor='#79CC47'
              text='5'
              textColor='text-white' canToggle={false} accepted={sprintData && sprintData.starArray?.length > 0 && sprintData?.starArray[1] >= 4} />
          </div>

          <div className='m-2 xs:m-6 xs:ml-3'>
            <StarCheck
              canToggle={false}
              backgroundColor={sprintData?.starArray && sprintData?.starArray[1] >= 7 ? 'bg-custom-green' : 'bg-custom-red'}
              borderIt= {sprintData?.starArray && sprintData?.starArray[1] >= 7 ? 'border-it-green' : 'border-it-red'}
              checkboxColor='#6AB63C'
              checkboxCheckedColor='#79CC47'
              text='8'
              textColor='text-white' accepted={sprintData && sprintData.starArray?.length > 0 && sprintData?.starArray[1] >= 7} />
          </div>
        </div>
        <div className='w-1/3 mt-8 ml-3'>
          <div className='m-2 xs:m-6 xs:ml-3'>
          <StarCheck
              canToggle={false}
              backgroundColor={sprintData?.starArray && sprintData?.starArray[1] >= 2 ? 'bg-custom-green' : 'bg-custom-red'}
              borderIt= {sprintData?.starArray && sprintData?.starArray[1] >= 2 ? 'border-it-green' : 'border-it-red'}
              checkboxColor='#6AB63C'
              checkboxCheckedColor='#79CC47'
              text='3'
              textColor='text-white' accepted={sprintData && sprintData.starArray?.length > 0 && sprintData?.starArray[1] >= 2} />
          </div>

          <div className='m-2 xs:m-6 xs:ml-3'>
          <StarCheck
              canToggle={false}
              backgroundColor={sprintData?.starArray && sprintData?.starArray[1] >= 5 ? 'bg-custom-green' : 'bg-custom-red'}
              borderIt= {sprintData?.starArray && sprintData?.starArray[1] >= 5 ? 'border-it-green' : 'border-it-red'}
              checkboxColor='#6AB63C'
              checkboxCheckedColor='#79CC47'
              text='6'
              textColor='text-white' accepted={sprintData && sprintData.starArray?.length > 0 && sprintData?.starArray[1] >= 5} />
          </div>

          <div className='m-2 xs:m-6 xs:ml-3'>
          <StarCheck
              canToggle={false}
              backgroundColor={sprintData?.starArray && sprintData?.starArray[1] >= 8 ? 'bg-custom-green' : 'bg-custom-red'}
              borderIt= {sprintData?.starArray && sprintData?.starArray[1] >= 8 ? 'border-it-green' : 'border-it-red'}
              checkboxColor='#6AB63C'
              checkboxCheckedColor='#79CC47'
              text='9'
              textColor='text-white' accepted={sprintData && sprintData.starArray?.length > 0 && sprintData?.starArray[1] >= 8} />
          </div>
        </div>
        <div className='w-1/3 mt-8 ml-3'>
          <div className='m-2 xs:m-6 xs:ml-3'>
          <StarCheck
              canToggle={false}
              backgroundColor={sprintData?.starArray && sprintData?.starArray[1] >= 3 ? 'bg-custom-green' : 'bg-custom-red'}
              borderIt= {sprintData?.starArray && sprintData?.starArray[1] >= 3 ? 'border-it-green' : 'border-it-red'}
              checkboxColor='#6AB63C'
              checkboxCheckedColor='#79CC47'
              text='4'
              textColor='text-white' accepted={sprintData && sprintData.starArray?.length > 0 && sprintData?.starArray[1] >= 3} />
          </div>

          <div className='m-2 xs:m-6 xs:ml-3'>
          <StarCheck
              canToggle={false}
              backgroundColor={sprintData?.starArray && sprintData?.starArray[1] >= 6 ? 'bg-custom-green' : 'bg-custom-red'}
              borderIt= {sprintData?.starArray && sprintData?.starArray[1] >= 6 ? 'border-it-green' : 'border-it-red'}
              checkboxColor='#6AB63C'
              checkboxCheckedColor='#79CC47'
              text='7'
              textColor='text-white' accepted={sprintData && sprintData.starArray?.length > 0 && sprintData?.starArray[1] >= 6} />
          </div>

          <div className='m-2 xs:m-6 xs:ml-3'>
          <StarCheck
              canToggle={false}
              backgroundColor={sprintData?.starArray && sprintData?.starArray[1] >= 9 ? 'bg-custom-green' : 'bg-custom-red'}
              borderIt= {sprintData?.starArray && sprintData?.starArray[1] >= 9 ? 'border-it-green' : 'border-it-red'}
              checkboxColor='#6AB63C'
              checkboxCheckedColor='#79CC47'
              text='10'
              textColor='text-white' accepted={sprintData && sprintData.starArray?.length > 0 && sprintData?.starArray[1] >= 9} />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ERCTableModal open={isModalOpen} onClose={handleCloseModal} sprintData={sprintData} ercModalData={ercModalData} />
      )}
      {isModalOpenIBO && (
        <IBOTableModal open={isModalOpenIBO} onClose={handleCloseModalIBO} sprintData={sprintData} />
      )}
    </div>
  )
}

export default BottomSection
