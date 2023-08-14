import { InputAdornment, TextField } from '@mui/material'
import { Button } from 'components/common/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

interface InputSectionProps {
    title: string;
    hint: string;
    placeholderText: string;
    buttonText: string;
  }

const InputSection = ({ title, hint, placeholderText, buttonText }: InputSectionProps) => (
  <>
    <div className='flex flex-row justify-between w-9/10 text-sm font-medium text-gray-600 mt-2'>
      <div className='font-bold text-sm'>
        <p>{title}</p>
      </div>
      <div>
        <p>{hint}</p>
      </div>
    </div>
    <div className="flex flex-row w-full justify-between items-center">
      <div className="flex justify-between mt-2 w-9/10">
        <TextField
          placeholder={placeholderText}
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ExpandMoreIcon />
              </InputAdornment>
            )
          }}
          className="text-xs font-bold uppercase"
        />
      </div>
      <div className='w-1/10'>
        <Button classes='text-md uppercase bg-primary-500'>
          {buttonText}
        </Button>
      </div>
    </div>
  </>
)

export default InputSection
