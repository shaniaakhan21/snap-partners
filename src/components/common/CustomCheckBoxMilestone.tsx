import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'

interface CustomCheckboxProps extends CheckboxProps {
  label: string
}

const CustomCheckBoxMilestone = ({ label, ...restProps }: CustomCheckboxProps) => {
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

export default CustomCheckBoxMilestone
