import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { IAuth, TSetAuth } from 'lib/stores/Auth'

import { TextContactCTA } from 'components/common/TextContactCTA'
import { FormAccountInfo } from './FormAccountInfo'
import { PhotoAccount } from './PhotoAccount'
import { BecomeRoles } from './BecomeRoles'
import { Badges } from './Badges'
import { GTMTrack } from 'lib/utils/gtm'
import Swal from 'sweetalert2'
import { getLocalStorage } from 'lib/utils/localStorage'
import axios from 'axios'
import { Button } from 'components/common/Button'
import { useState } from 'react'
import SignedCert from 'pages/wellness/components/SignedCert'

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
  const isIntegrousCustomerAndAssociate = (_auth.roles.integrousAssociate && _auth.roles.integrousCustomer)
  const isIntegrousCustomer = (_auth.roles.integrousCustomer && !_auth.roles.integrousAssociate)
  const isCertified = auth.isCertified
  const [signedCertModalOpen, setSignedCertModalOpen] = useState(false)
  const openSignedCertModal = () => {
    setSignedCertModalOpen(true)
  }
  const ConfirmRoleChange = (html) => {
    // lets return a promise here
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: 'Important!',
        html: html,
        icon: 'warning',
        confirmButtonText: 'Yes, Continue!',
        showDenyButton: true,
        denyButtonText: 'No, Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true)
        } else if (result.isDenied) {
          resolve(false)
        }
      })
    }
    )
  }

  const BecomeAssociate = async () => {
    const confirm = await ConfirmRoleChange('Are you sure you want to become an <b>IBO (Affiliate)</b>?')
    if (!confirm) return
    const token = getLocalStorage('accessToken')
    await axios.post('/api/integrous/upgradeToAffiliate', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    window.location.href = '/overview'
  }

  const BecomeCustomer = async () => {
    const confirm = await ConfirmRoleChange('Are you sure you want to change your account to be only <b>Customer</b>?')
    if (!confirm) return
    const token = getLocalStorage('accessToken')
    await axios.post('/api/integrous/rollBackToCustomer', {}, {
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
        <div className='flex flex-col'>
          <h1 className='text-2xl mr-6 mb-2'>IBO ID <span className='text-primary-500'>{_auth.id}</span></h1>
          {isCertified && (

            <Button
              onClick={openSignedCertModal}
              style={{ cursor: 'pointer', backgroundColor: '#32427A', padding: '2% 3%' }}
            >
              <div className='flex flex-col md:flex-row justify-between items-center'>
                <img className='w-10' src='/static/wellness/weight-care-certified.png'/>
                <span className='text-[12px] font-bold text-white'>WeightCare Certification</span>
              </div>
            </Button>

          )}
        </div>

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

      {isIntegrousCustomer && (
        <div className='w-full mt-3'>
          <div className='w-full flex flex-col md:flex-row justify-between items-start gap-y-10 gap-x-10 mt-3'>
            <a onClick={() => { BecomeAssociate() }} style={{ cursor: 'pointer' }} className='bg-white hover:bg-primary-300 hover:bg-opacity-30 rounded-md p-4 w-full'>
              <div className='flex flex-col md:flex-row justify-center items-center'>
                <span className='text-2xl font-bold text-gray-800 mr-10'>Become an IBO (Affiliate)</span>
              </div>
            </a>
          </div>
        </div>
      )}

      {isIntegrousCustomerAndAssociate && (
        <div className='w-full mt-3'>
          <div className='w-full flex flex-col md:flex-row justify-between items-start gap-y-10 gap-x-10 mt-3'>
            <a onClick={() => { BecomeCustomer() }} style={{ cursor: 'pointer' }} className='bg-white hover:bg-primary-300 hover:bg-opacity-30 rounded-md p-4 w-full'>
              <div className='flex flex-col md:flex-row justify-center items-center'>
                <span className='text-2xl font-bold text-gray-800 mr-10'>Become a Customer</span>
              </div>
            </a>
          </div>
        </div>
      )}

      <button
        className='block text-primary-500 mx-auto mt-11 font-bold text-lg'
        onClick={handleClickLogout}
      >
        Logout
      </button>

      <TextContactCTA />
      <SignedCert open={signedCertModalOpen} onClose={() => setSignedCertModalOpen(false)} />
    </div>
  )
}
