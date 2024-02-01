/* eslint-disable array-callback-return */
/* eslint-disable no-use-before-define */
import { Avatar, Box, Modal, Paper } from '@mui/material'
import React, { useState } from 'react'
import { getLocalStorage } from 'lib/utils/localStorage'
import axios from 'axios'
import { userLevelReverseMapping, userProfilePictureMapping } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/formOptionData'
import { PhoneIcon } from 'components/common/icons/Phone'
import UpdateSnapTypeModal from './modalPopups/UpdateSnapType'
import EditIcon from '@material-ui/icons/Edit'
import UpdateGrandfatherModal from './modalPopups/UpdateGrandfatherModal'
import EditProfileModal from './modalPopups/EditProfileModal'
import UpdateUserLevelModal from './modalPopups/UpdateUserLevelModal'
import SponsorUpdateModal from './modalPopups/SponsorUpdateModal'
import { ButtonComponent, InputComponent } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
import LoopIcon from '@mui/icons-material/Loop'

function InfoBanner ({ profileData, userLevel }) {
  const cname = 'profilePage-IBOProfile'
  const [snapTypeModal, setSnapTypeModal] = useState<boolean>(false)
  const [grandfatherModal, setGrandfatherModal] = useState<boolean>(false)
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false)
  const [userLevelModal, setUserLevelModal] = useState<boolean>(false)
  const [sponsorUpdateModal, setSponsorUpdateModal] = useState<boolean>(false)
  const [passwordResetModal, setPasswordResetModal] = useState<boolean>(false)
  const [newPassword, setNewPassword] = useState({
    password: ''
  })
  const mapping = userLevelReverseMapping

  const onCloseSnapTypeModal = () => {
    setSnapTypeModal(false)
  }

  const onCloseGrandfatherModal = () => {
    setGrandfatherModal(false)
  }

  const onCloseEditProfileModal = () => {
    setEditProfileModal(false)
  }

  const onCloseUserLevelModal = () => {
    setUserLevelModal(false)
  }

  const onCloseSponsorUpdateModal = () => {
    setSponsorUpdateModal(false)
  }

  const onClosePasswordResetModal = () => {
    setPasswordResetModal(false)
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }

  const handleResendEmail = async () => {
    const token = getLocalStorage('accessToken')
    await axios.post('/api/admin/user-resend-email',
      { id: profileData[0]?.id },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((result) => {
        console.log('result from resend email', result.data)
        alert('email sent successfully')
      })
  }
  const handlePasswordUpdate = (event, param) => {
    setNewPassword({ ...newPassword, password: event.target.value })
  }
  const handleResetPassword = async (e) => {
    if (newPassword.password !== '') {
      if (confirm('Do you want to reset this user password')) {
        const token = getLocalStorage('accessToken')
        await axios.put('/api/authentication/resetPasswordByAdmin',
          { ...newPassword, userId: profileData[0]?.id }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }

        )
          .then((result) => {
            if (result.data.result[0] === 1) {
              alert('password change successful')
              setPasswordResetModal(false)
            }
          })
          .catch((e) => {
            console.log('error while changing password', e)
          })
      }
    }
  }

  const snapType = (roles) => {
    let roleStr = ''
    roles && Object.keys(roles)?.map((role) => {
      if (roles[role]) {
        if (role === 'integrousAssociate') {
          roleStr = roleStr + ' IBO-Wellness'
        } else if (role === 'integrousCustomer') {
          roleStr = roleStr + ' Customer-Wellness'
        } else {
          roleStr = roleStr + ` ${role}`
        }
      }
    })

    return roleStr.trim().split(' ').join(' | ').split('-').join(' ')
  }

  const handleResendEmail2 = async () => {
    const token = getLocalStorage('accessToken')
    await axios.post('/api/admin/user-resend-email2',
      { id: profileData[0]?.id },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((result) => {
        console.log('result from resend email', result.data)
        alert('email sent successfully')
      })
  }
  return (
    <>
      <div className={`${cname}-midSection-mainInfo bg-[#E1EBF3] pb-4 rounded-t-2xl`}>
        <div className='w-full flex justify-center'>
          <Avatar src={profileData[0]?.profileImage ? profileData[0]?.profileImage : userProfilePictureMapping[profileData[0]?.ranks?.type]} style={{ width: '120px', height: '119px' }} className='border-4 border-white mt-4 mb-2 shadow-[0_1px_12px_-1px_rgba(0,0,0,0.2)]'/>
        </div>
        <div>
          <div className='text-center my-2'>
            <p className={`${cname}-midSection-mainInfo-name  mb-2`}>{`${profileData[0]?.name} ${profileData[0]?.lastname}`}</p>
            <p className='text-[#E74426] font-semibold text-sm'><span className='text-black'>User ID </span>{`${profileData[0]?.id}`}</p>
            <p className={`${cname}-midSection-mainInfo-text text-[#E74426] font-semibold `}>{`${profileData[0]?.email}`}</p>
            <p className='text-black font-semibold text-base'>{`${profileData[0]?.phoneNumber}`}</p>
          </div>
        </div>
        <div className='h-[2px] bg-[#CDDDEA] my-4'></div>
        { mapping[userLevel] >= 600 &&
        <React.Fragment >
          { mapping[userLevel] >= 600 &&
            <p className={`${cname}-midSection-mainInfo-text text-[#E74426] capitalize font-semibold text-sm flex justify-start items-center leading-8`} onClick={() => { handleResendEmail() }}><LoopIcon className='text-black ml-4 mr-1'/> resend welcome email</p>
          }
          { mapping[userLevel] >= 600 &&
            <p className={`${cname}-midSection-mainInfo-text text-[#E74426] capitalize font-semibold text-sm flex justify-start items-center  leading-8`} onClick={() => { handleResendEmail2() }}><LoopIcon className='text-black ml-4 mr-1'/> resend welcome email-2</p>
          }
        </React.Fragment>
        }

      </div>
      <div className='p-2 w-full'>
        <div className={`${cname}-midSection-mainInfo mt-2`}>
          <p className='text-base font-semibold text-black pl-2 capitalize mb-3'><span className={`${cname}-midSection-mainInfo-title text-sm`}>Snap Rank </span><br></br>{`${profileData[0]?.ranks?.type.charAt(0).toUpperCase()}${profileData[0]?.ranks?.type.slice(1)}`}</p>

          <div className='flex justify-between items-center'>
            <p className='text-base font-semibold text-[#E74426] pl-2 capitalize mb-3'><span className={`${cname}-midSection-mainInfo-title text-sm`}>Snap Type </span><br></br>{snapType(profileData[0]?.roles)}</p>
            { mapping[userLevel] >= 600 &&
              <p className='text-sm font-semibold text-[#E74426] pl-2 capitalize cursor-pointer' onClick={() => { setSnapTypeModal(true) }}><EditIcon className='w-5'/></p>
            }
          </div>

          <div className='flex justify-between items-center'>
            <p className='text-base font-semibold text-[#E74426] pl-2 capitalize mb-3'><span className={`${cname}-midSection-mainInfo-title text-sm`}>User Role </span><br></br>{profileData[0]?.level}</p>
            { mapping[userLevel] >= 1100 &&
          <p className='text-sm font-semibold text-[#E74426] pl-2 capitalize cursor-pointer' onClick={() => { setUserLevelModal(true) }}><EditIcon className='w-5'/></p>
            }
          </div>

          <div className='flex justify-between items-center'>
            { mapping[userLevel] >= 700 &&
        <p className={'text-base font-semibold text-[#E74426] pl-2 capitalize mb-3'}><span className={`${cname}-midSection-mainInfo-title text-sm`}>GrandfatherRank </span><br></br>{profileData[0]?.gRanks[0]?.status ? <span>{profileData[0]?.gRanks[0]?.gRank} {profileData[0]?.gRanks[0].gRank ? <><br></br><span className='text-[#555] text-xs font-semibold'>(until: {profileData[0]?.gRanks[0]?.to.split(' ')[0]})</span></> : <></>}</span> : <><span>none</span></>}</p>
            }
            { mapping[userLevel] >= 700 &&
          <p className='text-sm font-semibold text-[#E74426] pl-2 capitalize cursor-pointer' onClick={() => { setGrandfatherModal(true) }}><EditIcon className='w-5'/></p>
            }
          </div>
        </div>
        {/* <div className='flex flex-col justify-around items-end'>
          { mapping[userLevel] >= 700 &&
          <p className='text-sm font-semibold text-[#E74426] pl-2 capitalize cursor-pointer' onClick={() => { setSponsorUpdateModal(true) }}><EditIcon className='w-4'/>Edit Sponsor</p>
          }

        </div> */}
      </div>
      <div className='px-2 border-t border-[#C0D1DF] py-3 mx-1'>
        { mapping[userLevel] >= 600 &&
          <p className='text-sm font-semibold text-[#707070] pl-2 capitalize cursor-pointer flex justify-between leading-9 items-center' onClick={() => { setEditProfileModal(true) }}>Edit Profile <EditIcon className='w-5 text-[#E74426]'/></p>
        }
        { mapping[userLevel] >= 600 &&
          <p className='text-sm font-semibold text-[#707070] pl-2 capitalize cursor-pointer flex justify-between leading-9 items-center' onClick={() => { setPasswordResetModal(true) }}>reset Password <EditIcon className='w-5 text-[#E74426]'/></p>
        }
      </div>
      <UpdateSnapTypeModal snapTypeModal={snapTypeModal} onCloseSnapTypeModal={onCloseSnapTypeModal} userId={profileData[0]?.id} userRoles={profileData[0]?.roles} />
      <UpdateGrandfatherModal grandfatherModal={grandfatherModal} onCloseGrandfatherModal={onCloseGrandfatherModal} userId={profileData[0]?.id} profileData={profileData[0]} />
      <UpdateUserLevelModal userLevelModal={userLevelModal} onCloseUserLevelModal={onCloseUserLevelModal} userId={profileData[0]?.id} />
      <EditProfileModal editProfileModal={editProfileModal} onCloseEditProfileModal={onCloseEditProfileModal} userId={profileData[0]?.id} profileData={profileData[0]} />
      <SponsorUpdateModal sponsorUpdateModal={sponsorUpdateModal} onCloseSponsorUpdateModal={onCloseSponsorUpdateModal} userId={profileData[0]?.id} />
      <Modal open={passwordResetModal} onClose={onClosePasswordResetModal} className='resetPasswordModal'>
        <Box sx={style}>
          <InputComponent label='New Password' placeholder='newPassword' value={newPassword.password} onChangeFunction={handlePasswordUpdate} param={'password'} />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <ButtonComponent title='submit' onClickFunction={ handleResetPassword } />
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default InfoBanner
