import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import { Close as CrossIcon } from '@mui/icons-material'

interface CustomCheckboxProps extends CheckboxProps {
  label: string
}

export const CustomCheckBoxUnCheckedMilestone = ({ label, ...restProps }: CustomCheckboxProps) => {
  return (
    <div className="flex items-center">
      <Checkbox
        defaultChecked
        {...restProps}
        color="primary"
        checkedIcon={<CrossIcon sx={{ color: 'red' }}/>} // Use the cross icon as the checked icon
        sx={{
          color: 'rgb(130, 178, 84)',
          '&.Mui-checked': {
            color: '#54A52C'
          },
          '& .MuiSvgIcon-root': { fontSize: 55 }
        }}
      />
      <p className="ml-2 text-lg">{label}</p>
    </div>
  )
}

export const CustomCheckBoxCheckedMilestone = ({ label, ...restProps }: CustomCheckboxProps) => {
  return (
    <div className="flex items-center">
      <Checkbox defaultChecked
        {...restProps} color="primary"
        sx={{
          color: 'rgb(130, 178, 84)',
          '&.Mui-checked': {
            color: '#54A52C'
          },
          '& .MuiSvgIcon-root': { fontSize: 55 }
        }}
      />
      <p className="ml-2 text-lg">{label}</p>
    </div>
  )
}
