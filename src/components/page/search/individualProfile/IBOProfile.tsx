/* eslint-disable no-use-before-define */
import { Avatar, Modal, Box } from '@mui/material'
import { ButtonComponent, InputComponent } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuthStore } from '../../../../lib/stores'
import { getLocalStorage } from 'lib/utils/localStorage'

function IBOProfile ({ profileData }) {
  const [passwordResetModal, setPasswordResetModal] = useState<boolean>(false)
  const [newPassword, setNewPassword] = useState({
    password: ''
  })
  const { auth, setAuth, removeAuth } = useAuthStore()
  const cname = 'profilePage-IBOProfile'
  console.log('data from ibo', profileData)
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
  return (
    <>
      <div className={`${cname}-container`}>
        <div className={`${cname}-header`}>
          <p className={`${cname}-header-text`}>User ID - {`${profileData[0]?.id}`}</p>
          <p className={`${cname}-header-text ${cname}-midSection-mainInfo-text`}>Edit Profile<img src='/images/icons/edit.svg' style={{ width: '18px', height: '24px' }}/></p>
        </div>

        <div className={`${cname}-midSection`}>
          <div className={`${cname}-midSection-mainInfo`}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
              <Avatar src={profileData[0]?.profileImage} style={{ width: '78px', height: '78px' }} />
              <div style={{ marginTop: '-15px' }}><p className={`${cname}-midSection-mainInfo-name`}>{`${profileData[0]?.name} ${profileData[0]?.lastname}`}</p>
                <p className={`${cname}-midSection-mainInfo-text`}><img src='/images/icons/email.svg'/>{`${profileData[0]?.email}`}</p></div>
            </div>
            <p className={`${cname}-midSection-mainInfo-text`}><img src='/images/icons/flip-2.svg' style={{ width: '18px', height: '24px' }}/>resend email</p>
            <p className={`${cname}-midSection-mainInfo-text`}><img src='/images/icons/edit.svg' style={{ width: '18px', height: '24px' }}/>{`${profileData[0]?.phoneNumber}`}</p>
          </div>

          <div className={`${cname}-midSection-AdditionalInfo`}>
            <div>
              <p className={`${cname}-footer-heading`}>{`${profileData[0]?.ranks?.type}`}</p>
              <p className={`${cname}-midSection-mainInfo-name adInfoText`}>Sponsered by {profileData[0]?.sponsor?.name} {profileData[0]?.sponsor?.lastname}</p>
            </div>
            <div>
              <div className={`${cname}-midSection-AdditionalInfo-icons`}>
                <img src='/images/icons/deliveryMan.png' />
                <img src='/images/icons/shopper.png' />
                <img src='/images/icons/tray.png' />
              </div>
              <p className={`${cname}-midSection-mainInfo-name adInfoText resetPasswordText`} onClick={() => { setPasswordResetModal(true) }}>reset Password </p>
            </div>
          </div>

          <hr style={{ margin: '30px auto 10px auto' }} />
          <div className={`${cname}-footer`}>
            <div>
              <h2 className={`${cname}-footer-heading`}>Address :</h2>
              <p className={`${cname}-footer-text`}>skudgfoish sifhvksb sihsic j</p>
            </div>

            <div>
              <h2 className={`${cname}-footer-heading`}>Date Added :</h2>
              <p className={`${cname}-footer-text`}>date</p>
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
      </div>
    </>
  )
}

export default IBOProfile
