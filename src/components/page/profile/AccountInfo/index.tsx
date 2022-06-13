import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { IAuth } from 'lib/stores/Auth'

import { TextContactCTA } from 'components/common/TextContactCTA'
import { UpgradeManagerCTA } from './UpgradeManagerCTA'
import { FormAccountInfo } from './FormAccountInfo'
import { PhotoAccount } from './PhotoAccount'
import { BecomeRoles } from './BecomeRoles'
import { Badges } from './Badges'
import { Rank } from './Rank'

interface IAccountInfoProps {
  auth: IAuth
  removeAuth: () => void
  setNewWindow: (newWindow: Window) => void
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

export const AccountInfo = ({ auth, removeAuth, setNewWindow, setTypeUpdate }: IAccountInfoProps) => {
  return (
    <div className='max-w-4xl mx-auto'>
      <div className='flex justify-start items-center gap-x-5 select-none'>
        <PhotoAccount photoURL={null} />
        <Badges auth={auth} />
      </div>

      <div className='mt-11'>
        <FormAccountInfo
          auth={auth}
          setTypeUpdate={setTypeUpdate}
        />
      </div>

      {!auth.roles.admin && (
        <div className='flex flex-col md:flex-row items-center justify-center mt-11'>
          <Rank auth={auth} />
          <UpgradeManagerCTA auth={auth} setNewWindow={setNewWindow} />
        </div>
      )}

      <BecomeRoles auth={auth} />

      <button
        className='block text-primary-500 mx-auto mt-11 font-bold text-lg'
        onClick={removeAuth}
      >
        Logout
      </button>

      <TextContactCTA />
    </div>
  )
}
