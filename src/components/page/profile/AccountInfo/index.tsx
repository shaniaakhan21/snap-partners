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
import { GrandfatherRankHr } from 'components/common/overview/GrandfatherRankHr'
import { FormControlLabel, FormGroup } from '@mui/material'
import { BusinessFields } from './BusinessFields'
import Switch from '@mui/material/Switch'
import { CustomisedAlerts } from './CustomisedAlerts'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'

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
  const isValidated = auth.isValidated
  const [signedCertModalOpen, setSignedCertModalOpen] = useState(false)
  const [isSwitchOn, setIsSwitchOn] = useState(true)

  const handleSwitchChange = () => {
    setIsSwitchOn((prev) => !prev)
  }
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
    <div className='max-w-full mx-56 flex flex-row gap-x-8'>
      <div className='flex flex-col justify-start items-center select-none w-1/3 rounded-2xl border-4 border-white h-fit bg-[#E1EBF3] pt-8  shadow-[0_1px_17px_-1px_rgba(0,0,0,0.2)]'>
        <PhotoAccount photoURL={auth.profileImage} auth={auth} setAuth={setAuth}/>
        <Badges auth={auth} />
        <span className='text-sm font-medium text-[#E74426] mt-2'>{auth.email}</span>
        <div className='w-10/12 h-[2px] mx-10 bg-[#C6D3DD] my-6'></div>
        <div className='flex flex-col  w-full h-full text-center'>
          <h1 className='text-2xl  font-bold mb-6'>IBO ID <span className='text-primary-500'>{_auth.id}</span></h1>
          <div className='bg-white pb-10'>
            <GrandfatherRankHr containerStyles='border-0 w-full mx-0 p-4 font-semibold'
              textStyles='text-[#687886] font-bold text-base'/>
            {isCertified && (

              <Button
                onClick={openSignedCertModal}
                classes='w-[62%]'
                style={{ cursor: 'pointer', backgroundColor: '#32427A', padding: '2% 2%', borderRadius: '14px' }}
              >
                <div className='flex flex-col md:flex-row justify-between items-center'>
                  <img className='w-10' src='/static/wellness/weight-care-certified.png'/>
                  <span className='text-[12px] font-semibold text-white'>WeightCare Certification</span>
                </div>
              </Button>

          )}
        </div>
        {auth.TINstatus === 'business' && (
          <div className='flex flex-col'>
            <h1 className='text-2xl mr-6 mb-2'>Business Info</h1>
            <div className='flex justify-center flex-row-reverse rounded-full p-1 bg-white border-2 border-white shadow-md items-center justify-evenly'>
              <span className='font-bold uppercase'>{isSwitchOn ? 'Hide' : 'Show'}</span>
              <label className='switch'>
                <input type='checkbox' checked={isSwitchOn} onChange={handleSwitchChange} />
                <span className='slider'></span>
              </label>

            </div>

          </div>

        )}

      </div>
      <div className='w-2/3 bg-white shadow-[0_1px_17px_-1px_rgba(0,0,0,0.2)] rounded-2xl pt-2'>
        <div className='p-10 pb-0'>
          <div className='mt-2'>
            <FormAccountInfo
              auth={auth}
              setTypeUpdate={setTypeUpdate}
            />
          </div>
          <div className='w-full h-[2px] bg-[#C6D3DD] my-6'></div>
          <div className='mt-2'>
            <CustomisedAlerts/>
          </div>

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
        </div>

        <div className='bg-[#E1EBF3] p-12 rounded-b-2xl'>
          <button
            className='block text-white bg-[#E74426] mx-auto font-bold text-lg rounded-full py-2 px-8 mb-4'
            onClick={handleClickLogout}
          >
            <LogoutOutlinedIcon/>
        Logout
          </button>

          <TextContactCTA />
          <SignedCert open={signedCertModalOpen} onClose={() => setSignedCertModalOpen(false)} />
        </div>
      </div>
    </div>
  )
}
