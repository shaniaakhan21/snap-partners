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
import { getLocalStorage } from 'lib/utils/localStorage'
import axios from 'axios'

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
  const isIntegrousCustomer = auth.roles.integrousCustomer

  const becomeAffiliate = async () => {
    const token = getLocalStorage('accessToken')
    await axios.post('/api/integrous/upgradeToAffiliate', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    window.location.href = '/overview'
  }

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

      {isIntegrousCustomer && (
        <div className='mt-10'>
          <h1 style={{ fontSize: 35 }}>To become an IBO (Affiliate) click below</h1>
          <br />
          <button onClick={() => { becomeAffiliate() }}style={{ fontSize: 20 }} className="flex text-xs items-center bg-red-600 hover:bg-red-700 text-white font-bold h-10 w-50  py-3 px-4 rounded-l-full rounded-r-full">
          REGISTER NOW {'>'}
          </button>
        </div>
      )}
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
