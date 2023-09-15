import { Checkbox, Modal } from '@mui/material'
import StarCheck from './StarCheck'
import { useState } from 'react'
import ERCClientsTable from './ERCClientsTable'
import QualifiedIBOTable from './QualifiedIBOTable';
import ERCTableModal from './ERCTableModal';
import IBOTableModal from './IBOTableModal';

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
  const [isChecked, setChecked] = useState(accepted)
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
            fontSize: 20
          }
        }
      }}
    />
  )
}

const TopSection = (

) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const handleParagraphClick = () => {
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
    <div className='p-2 lg:pl-8 lg:py-10 pb-11'>
      <div className='info-box px-3 py-2'>
        <p><span className='font-bold'>Yellow - </span>Approved upon confirmation of min 20 W-2’s</p>
        <p><span className='font-bold'>Green - </span>Goal achieved</p>
      </div>
      <br></br>
      <p className="text-base lg:text-2xl text-black font-semibold p-2 lg:pl-2">You do 5&1</p>
      <div className='flex flex-row items-center'>
        <CheckboxItem checkboxColor={'#edd607'} checkboxCheckedColor={'#FFE500'} canToggle={false} accepted={true} />
        <a className="text-sm lg:text-lg text-black font-medium cursor-pointer" onClick={handleParagraphClick}>Acquire a qualified ERC Client <span className='text-xs lg:text-base text-gray-600'>(min 20 W-2's) </span></a>
      </div>
      <div className='flex flex-row items-center'>
        <CheckboxItem checkboxColor={'#6AB63C'} checkboxCheckedColor={'#79CC47'} canToggle={false} accepted={true} />
        <a className="text-sm lg:text-lg text-black font-medium cursor-pointer" onClick={handleParagraphClickIBO}>Personally sponsor 5 IBO's </a>
      </div>
      <br></br>
      <p className="text-base lg:text-2xl text-black font-semibold p-2 lg:pl-2">Help a directly sponsored friend (IBO) do 5&1 </p>
      <div className='flex flex-row items-center  mt-2'>
        <CheckboxItem checkboxColor={'#6AB63C'} checkboxCheckedColor={'#79CC47'} canToggle={false} accepted={true} />
        <a className="text-sm lg:text-lg text-black font-medium cursor-pointer" onClick={handleParagraphClick}><span className='font-bold' >Friend</span> - Acquires a qualified ERC Client <span className='text-xs lg:text-base text-gray-600'>(min 20 W-2's) </span> </a>
      </div>
      <div className='flex flex-row items-center'>
        <CheckboxItem checkboxColor={'#6AB63C'} checkboxCheckedColor={'#79CC47'} canToggle={false} accepted={true} />
        <p className="text-sm lg:text-lg text-black font-medium cursor-pointer" onClick={handleParagraphClickIBO}><span className='font-bold' >Friend</span> - Personally sponsors 5 IBO's</p>
      </div>
      <br></br>
      <p className="text-base lg:text-2xl text-black font-semibold p-2 lg:pl-2">Friend helps a directly sponsored Friend</p>
      <div className='flex flex-row align-start'>
        <CheckboxItem checkboxColor={'#6AB63C'} checkboxCheckedColor={'#79CC47'} canToggle={false} accepted={true} />
        <p className="text-sm lg:text-lg text-black font-medium mt-2 cursor-pointer" onClick={handleParagraphClick}><span className='font-bold' >Friend</span> - Helps one of their personally sponsored IBO’s acquire a qualified ERC Client  <span className='text-xs lg:text-base text-gray-600'>(on your level 2)</span> </p>
      </div>
      <div className='w-1/4 mt-8 ml-3'>
        <StarCheck
          backgroundColor='bg-custom-green'
          borderIt='border-it-green'
          checkboxColor='#6AB63C'
          checkboxCheckedColor='#79CC47'
          text='1'
          textColor='text-white' canToggle={false} accepted={true} />
      </div>
      {isModalOpen && (
        <ERCTableModal open={isModalOpen} onClose={handleCloseModal} />
      )}
      {isModalOpenIBO && (
        <IBOTableModal open={isModalOpenIBO} onClose={handleCloseModalIBO} />
      )}
    </div>

  )
}
export default TopSection
