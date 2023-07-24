/* eslint-disable no-use-before-define */
import { Avatar, Modal, Box } from '@mui/material'
import { ButtonComponent, InputComponent, SelectComponent } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuthStore } from '../../../../lib/stores'
import { getLocalStorage } from 'lib/utils/localStorage'
import { userLevelOptions } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/formOptionData'
import UpdateUserLevelModal from './modalPopups/UpdateUserLevelModal'
import EditProfileModal from './modalPopups/EditProfileModal'

function IBOProfile ({ profileData }) {
  const [passwordResetModal, setPasswordResetModal] = useState<boolean>(false)
  const [userLevelModal, setUserLevelModal] = useState<boolean>(false)
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false)
  const [newPassword, setNewPassword] = useState({
    password: ''
  })
  const { auth, setAuth, removeAuth } = useAuthStore()
  const cname = 'profilePage-IBOProfile'
  console.log('data from ibo', profileData)
  const onClosePasswordResetModal = () => {
    setPasswordResetModal(false)
  }
  const onCloseUserLevelModal = () => {
    setUserLevelModal(false)
  }
  const onCloseEditProfileModal = () => {
    setEditProfileModal(false)
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
  const handlePasswordUpdate = (event, param) => {
    setNewPassword({ ...newPassword, password: event.target.value })
  }
  const handleResetPassword = async () => {
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
  const formatDate = (dateString) => {
    console.log('date input', dateString)
    const currentDate = new Date(dateString)
    console.log('date from format date ', currentDate)
    return `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`
  }
  return (
    <>
      <div className={`${cname}-container`}>
        <div className={`${cname}-header`}>
          <p className={`${cname}-header-text`}>User ID - {`${profileData[0]?.id}`}</p>
          <p className={`${cname}-header-text ${cname}-midSection-mainInfo-text`} onClick={() => { setEditProfileModal(true) }}>Edit Profile<img src='/images/icons/edit.svg' style={{ width: '18px', height: '24px' }}/></p>
        </div>

        <div className={`${cname}-midSection`}>
          <div className={`${cname}-midSection-mainInfo`}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
              <Avatar src={profileData[0]?.profileImage} style={{ width: '78px', height: '78px' }} />
              <div style={{ marginTop: '-15px' }}><p className={`${cname}-midSection-mainInfo-name`}>{`${profileData[0]?.name} ${profileData[0]?.lastname}`}</p>
                <p className={`${cname}-midSection-mainInfo-text`}><img src='/images/icons/email.svg'/>{`${profileData[0]?.email}`}</p></div>
            </div>
            <p className={`${cname}-midSection-mainInfo-text`}><img src='/images/icons/flip-2.svg' style={{ width: '18px', height: '24px' }}/>resend welcome email</p>
            <p className={`${cname}-midSection-mainInfo-text`}><img src='/images/icons/edit.svg' style={{ width: '18px', height: '24px' }}/>{`${profileData[0]?.phoneNumber}`}</p>
          </div>
          <div className={`${cname}-midSection-mainInfo`}>
            <p className={`${cname}-footer-heading`}>{`${profileData[0]?.ranks?.type}`}</p>
            <p className={`${cname}-midSection-mainInfo-text`}><span className={`${cname}-midSection-mainInfo-title`}>User Level -</span>{profileData[0]?.level}</p>
            <p className={`${cname}-midSection-mainInfo-text`}><span className={`${cname}-midSection-mainInfo-title`}>GrandfatherRank -</span>{profileData[0]?.gRanks[0]?.gRank}</p>
          </div>

          <div className={`${cname}-midSection-AdditionalInfo`}>
            <div>
              <p className={`${cname}-midSection-mainInfo-name adInfoText`}>Sponsered by <a href={`/search/profile/${profileData[0]?.sponsor?.id}`}>{profileData[0]?.sponsor?.name} {profileData[0]?.sponsor?.lastname}</a></p>
            </div>
            <div>
              <div className={`${cname}-midSection-AdditionalInfo-icons`}>
                <img src='/static/badges/binary.png' style={{ width: '70px' }} />
                <img src='/images/icons/deliveryMan.png' />
                <img src='/images/icons/Shopper.png' />
                <img src='/images/icons/tray.png' />
              </div>
              <p className={`${cname}-midSection-mainInfo-name adInfoText resetPasswordText`} onClick={() => { setPasswordResetModal(true) }}>reset Password </p>
              <p className={`${cname}-midSection-mainInfo-name adInfoText resetPasswordText`} onClick={() => { setUserLevelModal(true) }}>reset User Level </p>
            </div>
          </div>

          <hr style={{ margin: '30px auto 10px auto' }} />
          <div className={`${cname}-footer`}>
            <div>
              <h2 className={`${cname}-footer-heading`}>Address :</h2>
              <p className={`${cname}-footer-text`}>skudgfoish sifhvksb sihsic j</p>
            </div>

            <div>
              <h2 className={`${cname}-footer-heading`}>Start Date:</h2>
              <p className={`${cname}-footer-text`}>{`${formatDate(profileData[0]?.createdAt)}`}</p>
            </div>

            <div>
              <h2 className={`${cname}-footer-heading`}>Activity Log :</h2>
              <p className={`${cname}-footer-text`}>line 1</p>
              <p className={`${cname}-footer-text`}>line 2</p>
            </div>

          </div>

        </div>
        <Modal open={passwordResetModal} onClose={onClosePasswordResetModal} className='resetPasswordModal'>
          <Box sx={style}>
            <InputComponent label='New Password' placeholder='newPassword' value={newPassword.password} onChangeFunction={handlePasswordUpdate} param={'password'} />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <ButtonComponent title='submit' onClickFunction={ handleResetPassword } />
            </div>
          </Box>
        </Modal>

        {/* <Modal open={userLevelModal} onClose={onCloseUserLevelModal} className='resetPasswordModal'>
          <Box sx={style}>
          <SelectComponent label={'Reset User level'} name={'userLevel'} options={userLevelOptions}/>
            {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <ButtonComponent title='submit' onClickFunction={ handleResetPassword } />
            </div>
          </Box>
        </Modal> */}
        <UpdateUserLevelModal userLevelModal={userLevelModal} onCloseUserLevelModal={onCloseUserLevelModal} userId={profileData[0]?.id} />
        <EditProfileModal editProfileModal={editProfileModal} onCloseEditProfileModal={onCloseEditProfileModal} userId={profileData[0]?.id}/>
      </div>
    </>
  )
}

export default IBOProfile
