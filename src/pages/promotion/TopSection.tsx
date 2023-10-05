/* eslint-disable no-unneeded-ternary */
import { Checkbox, Modal } from '@mui/material'
import StarCheck from './StarCheck'
import { useState, useEffect } from 'react'
import ERCClientsTable from './ERCClientsTable'
import QualifiedIBOTable from './QualifiedIBOTable'
import ERCTableModal from './ERCTableModal'
import IBOTableModal from './IBOTableModal'

interface CheckboxItemProps {
  checkboxColor: string;
  checkboxCheckedColor: string;
  canToggle: boolean;
  accepted: boolean;
}
const CheckboxItem = ({
  checkboxColor,
  checkboxCheckedColor,
  canToggle,
  accepted
}: CheckboxItemProps) => {
  console.log('accepted is', accepted)
  const [isChecked, setChecked] = useState(accepted)
  useEffect(() => {
    setChecked(accepted)
  }, [accepted])
  const handleCheckboxChange = () => {
    if (canToggle) {
      setChecked(!isChecked)
    }
  }
  return (
    <Checkbox
      checked={isChecked}
      onChange={handleCheckboxChange}
      sx={{
        '& .MuiSvgIcon-root': { fontSize: 30 },
        color: checkboxColor,
        '&.Mui-checked': {
          color: checkboxCheckedColor
        },
        '@media (max-width: 600px)': {
          '& .MuiSvgIcon-root': {
            fontSize: 26
          }
        }
      }}
    />
  )
}

const TopSection = ({ sprintData }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [ercModalData, setErcModalData] = useState(null)
  const [personal, setPersonal] = useState(false)

  const refineData = (companies) => {
    if (companies.length > 0) {
      companies = [...companies.filter((element) => (element))].flat()
    }
    console.log('qualifiied NC', companies)
    return companies
  }

  const handleParagraphClick = (ercData?: any []) => {
    console.log(ercData)
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
    <div className='p-2 lg:pl-8 lg:py-10 lg:pb-11'>
      <div className='info-box px-3 py-2'>
        <p><span className='font-bold'>Yellow - </span>Approved upon confirmation of min 20 W-2’s</p>
        <p><span className='font-bold'>Green - </span>Goal achieved</p>
      </div>
      <br></br>
      <p className="text-base lg:text-2xl text-black font-semibold p-2 lg:pl-2">You do 5&1</p>
      <div className='flex flex-row items-center'>
        <CheckboxItem checkboxColor={sprintData?.personalQualifiedErc === true ? '#6AB63C' : '#6AB63C'} checkboxCheckedColor={sprintData?.personalQualifiedErc === true ? '#79CC47' : '#FFE500'} canToggle={false} accepted={sprintData?.personalQualifiedErc === true } />
        <a className="text-sm lg:text-lg text-black font-medium cursor-pointer" onClick={() => {
          handleParagraphClick([...sprintData?.personalQualifiedErcCompanies, ...sprintData?.personalNonQualifiedErcCompanies])
          setPersonal(true)
        }}>Acquire a qualified ERC Client <span className='text-xs lg:text-base text-gray-600'>(min 20 W-2's) </span></a>
      </div>
      <div className='flex flex-row items-center'>
        <CheckboxItem checkboxColor={'#6AB63C'} checkboxCheckedColor={'#79CC47'} canToggle={false} accepted={sprintData?.personalFiveIbo === true } />
        <a className="text-sm lg:text-lg text-black font-medium cursor-pointer" onClick={handleParagraphClickIBO}>Personally sponsor 5 IBO's </a>
      </div>
      <br></br>
      <p className="text-base lg:text-2xl text-black font-semibold p-2 lg:pl-2">Help a directly sponsored friend (IBO) do 5&1 </p>
      <div className='flex flex-row items-center  mt-2'>
        <CheckboxItem checkboxColor={'#6AB63C'} checkboxCheckedColor={'#79CC47'} canToggle={false} accepted={sprintData?.friendQualifiedErc === true} />
        <a className="text-sm lg:text-lg text-black font-medium cursor-pointer" onClick={() => {
          handleParagraphClick(refineData([...sprintData?.friendQualifiedErcArray, ...sprintData?.friendNonQualifiedErcCompanies]))
          setPersonal(false)
        }}><span className='font-bold' >Friend</span> - Acquires a qualified ERC Client <span className='text-xs lg:text-base text-gray-600'>(min 20 W-2's) </span> </a>
      </div>
      <div className='flex flex-row items-center'>
        <CheckboxItem checkboxColor={'#6AB63C'} checkboxCheckedColor={'#79CC47'} canToggle={false} accepted={sprintData?.friendFiveIbo === true} />
        <p className="text-sm lg:text-lg text-black font-medium cursor-pointer" onClick={handleParagraphClickIBO}><span className='font-bold' >Friend</span> - Personally sponsors 5 IBO's</p>
      </div>
      <br></br>
      <p className="text-base lg:text-2xl text-black font-semibold p-2 lg:pl-2">Friend helps a directly sponsored Friend</p>
      <div className='flex flex-row align-start'>
        <CheckboxItem checkboxColor={'#6AB63C'} checkboxCheckedColor={'#79CC47'} canToggle={false} accepted={sprintData?.friendOfFriendQualifiedErc === true} />
        <p className="text-sm lg:text-lg text-black font-medium mt-2 cursor-pointer" onClick={() => {
          handleParagraphClick(refineData([...sprintData?.friendOfFriendQualifiedErcArray, ...sprintData?.friendOfFriendNonQualifiedErcCompanies]))
          setPersonal(false)
        }}><span className='font-bold' >Friend</span> - Helps one of their personally sponsored IBO’s acquire a qualified ERC Client  <span className='text-xs lg:text-base text-gray-600'>(on your level 2)</span> </p>
      </div>
      <div className='w-1/4 mt-8 ml-3'>
        <StarCheck
          backgroundColor={sprintData?.starArray && sprintData?.starArray[0] === 1 ? 'bg-custom-green' : 'bg-custom-red'}
          borderIt={sprintData?.starArray && sprintData?.starArray[0] === 1 ? 'border-it-green' : 'border-it-red'}
          checkboxColor='#6AB63C'
          checkboxCheckedColor='#79CC47'
          text='1'
          textColor='text-white' canToggle={false} accepted={sprintData && sprintData.starArray?.length > 0 && sprintData?.starArray[0] === 1} />
      </div>
      {isModalOpen && (
        <ERCTableModal open={isModalOpen} onClose={handleCloseModal} sprintData={sprintData} ercModalData={ercModalData} personal={personal} />
      )}
      {isModalOpenIBO && (
        <IBOTableModal open={isModalOpenIBO} onClose={handleCloseModalIBO} sprintData={sprintData} />
      )}
    </div>

  )
}
export default TopSection
