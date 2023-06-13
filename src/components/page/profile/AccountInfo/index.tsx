import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { IAuth, TSetAuth } from 'lib/stores/Auth'

import { TextContactCTA } from 'components/common/TextContactCTA'
import { FormAccountInfo } from './FormAccountInfo'
import { PhotoAccount } from './PhotoAccount'
import { BecomeRoles } from './BecomeRoles'
import { Badges } from './Badges'
import { Rank } from './Rank'
import { GTMTrack } from 'lib/utils/gtm'

interface IAccountInfoProps {
  auth: IAuth
  setAuth: TSetAuth
  removeAuth: () => void
  setNewWindow: (newWindow: Window) => void
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

export const AccountInfo = ({ auth, setAuth, removeAuth, setNewWindow, setTypeUpdate }: IAccountInfoProps) => {
  const handleClickLogout = () => {
    GTMTrack.logout('profile')
    removeAuth()
  }

  const _auth :any = auth
  const isIntegrous = (_auth.roles.integrousAssociate || _auth.roles.integrousCustomer)

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='flex justify-start items-center gap-x-5 select-none'>
        <PhotoAccount photoURL={auth.profileImage} auth={auth} setAuth={setAuth}/>
        <Badges auth={auth} />
        <div className='flex-1' />
        <h1 className='text-2xl mr-6'>IBO ID <span className='text-primary-500'>{_auth.id}</span></h1>
      </div>

      <div className='mt-11'>
        <FormAccountInfo
          auth={auth}
          setTypeUpdate={setTypeUpdate}
        />
      </div>

      {!isIntegrous && (
        <BecomeRoles auth={auth} />
      )}

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
