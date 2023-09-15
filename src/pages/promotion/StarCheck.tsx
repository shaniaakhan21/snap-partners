import { Checkbox } from '@mui/material'
import { useState } from 'react'

interface StarCheckProps {
  backgroundColor: string;
  borderIt: string;
  checkboxColor: string;
  checkboxCheckedColor: string;
  text: string;
  textColor: string;
  canToggle: boolean;
  accepted: boolean;
}

const StarCheck = ({
  backgroundColor,
  checkboxColor,
  checkboxCheckedColor,
  text,
  textColor,
  borderIt,
  canToggle,
  accepted
}: StarCheckProps) => {
  const [isChecked, setChecked] = useState(accepted)
  const handleCheckboxChange = () => {
    if (canToggle) {
      setChecked(!isChecked)
    }
  }

  return (
    <div className={`flex flex-row border-it ${borderIt}`}>
      <div className={`${backgroundColor} flex flex-row items-center w-1/2 justify-evenly p-1 lg:p-2`}>
        <img className='w-1/2 pr-1' src='/static/promotion/white-star.svg' alt='Star' />
        <p className={`text-xl ${textColor}`}>{text}</p>
      </div>
      <div className='w-1/2'>
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          disabled={!canToggle}
          sx={{
            '& .MuiSvgIcon-root': { fontSize: 30 },
            color: checkboxColor,
            width: '100%',
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
      </div>
    </div>
  )
}

export default StarCheck
