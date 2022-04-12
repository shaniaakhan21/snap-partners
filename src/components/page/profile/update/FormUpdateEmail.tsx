import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { IAuth } from 'lib/stores/Auth'

import { Button } from 'components/common/Button'

interface IFormUpdatePhoneProps {
  auth: IAuth
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

export const FormUpdateEmail = ({ auth, setTypeUpdate }: IFormUpdatePhoneProps) => {
  return (
    <div className='max-w-4xl mx-auto'>
      <Button onClick={() => setTypeUpdate(null)}>
        Cancel
      </Button>
    </div>
  )
}
