import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import { Close as CrossIcon } from '@mui/icons-material'

interface CustomCheckboxProps extends CheckboxProps {
  label: string,
  checkBoxSize: number,
  labelSize: string
}

export const CustomCheckBoxUnCheckedMilestone = ({ label, checkBoxSize, labelSize, ...restProps }: CustomCheckboxProps) => {
  return (
    <div className="flex items-center">
      <Checkbox
        defaultChecked
        disabled
        {...restProps}
        color="primary"
        checkedIcon={<CrossIcon sx={{ color: 'red' }}/>} // Use the cross icon as the checked icon
        sx={{
          color: 'rgb(130, 178, 84)',
          '&.Mui-checked': {
            color: '#54A52C'
          },
          '& .MuiSvgIcon-root': { fontSize: checkBoxSize }
        }}
      />
      {labelSize === 'lg' && <p className="ml-2 text-lg">{label}</p>}
      {labelSize === 'sm' && <p className="ml-2 text-sm">{label}</p>}
      {labelSize === 'xsm' && <p className="ml-2 text-xsm">{label}</p>}
    </div>
  )
}

export const CustomCheckBoxCheckedMilestone = ({ label, checkBoxSize, labelSize, ...restProps }: CustomCheckboxProps) => {
  return (
    <div className="flex items-center">
      <Checkbox defaultChecked
        disabled
        {...restProps} color="primary"
        sx={{
          color: 'rgb(130, 178, 84)',
          '&.Mui-checked': {
            color: '#54A52C'
          },
          '& .MuiSvgIcon-root': { fontSize: checkBoxSize }
        }}
      />
      {labelSize === 'lg' && <p className="ml-2 text-lg">{label}</p>}
      {labelSize === 'sm' && <p className="ml-2 text-sm">{label}</p>}
      {labelSize === 'xsm' && <p className="ml-2 text-xsm">{label}</p>}
    </div>
  )
}
