import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { IAuth } from 'lib/stores/Auth'

import { TextContactCTA } from 'components/common/TextContactCTA'
import { FormAccountInfo } from './FormAccountInfo'
import { PhotoAccount } from './PhotoAccount'
import { BecomeRoles } from './BecomeRoles'
import { Badges } from './Badges'
import { Rank } from './Rank'
import { GTMTrack } from 'lib/utils/gtm'

interface IAccountInfoProps {
  auth: IAuth
  removeAuth: () => void
  setNewWindow: (newWindow: Window) => void
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

export const AccountInfo = ({ auth, removeAuth, setNewWindow, setTypeUpdate }: IAccountInfoProps) => {
  const handleClickLogout = () => {
    GTMTrack.logout('profile')
    removeAuth()
  }

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='flex justify-start items-center gap-x-5 select-none'>
        <PhotoAccount photoURL={null} auth={auth}/>
        <Badges auth={auth} />
      </div>

      <div className='mt-11'>
        <FormAccountInfo
          auth={auth}
          setTypeUpdate={setTypeUpdate}
        />
      </div>

      <BecomeRoles auth={auth} />

      <button
        className='block text-primary-500 mx-auto mt-11 font-bold text-lg'
        onClick={handleClickLogout}
      >
        Logout
      </button>

      <TextContactCTA />
    </div>
  )
}
