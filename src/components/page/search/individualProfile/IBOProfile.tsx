/* eslint-disable no-use-before-define */
import { Avatar, Modal, Box, TableContainer, Table, TableRow, TableCell, TableBody, TableHead } from '@mui/material'
import { ButtonComponent, InputComponent, SelectComponent } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuthStore } from '../../../../lib/stores'
import { getLocalStorage } from 'lib/utils/localStorage'
import { userLevelReverseMapping } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/formOptionData'
import UpdateUserLevelModal from './modalPopups/UpdateUserLevelModal'
import EditProfileModal from './modalPopups/EditProfileModal'
import UpdateGrandfatherModal from './modalPopups/UpdateGrandfatherModal'
import SponsorUpdateModal from './modalPopups/SponsorUpdateModal'
import InfoBanner from './InfoBanner'

function IBOProfile ({ profileData, userLevel }) {
  const [passwordResetModal, setPasswordResetModal] = useState<boolean>(false)
  const [userLevelModal, setUserLevelModal] = useState<boolean>(false)
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false)
  const [grandfatherModal, setGrandfatherModal] = useState<boolean>(false)
  const [sponsorUpdateModal, setSponsorUpdateModal] = useState<boolean>(false)
  const [newPassword, setNewPassword] = useState({
    password: ''
  })
  const { auth, setAuth, removeAuth } = useAuthStore()
  const cname = 'profilePage-IBOProfile'
  console.log('data from ibo', profileData)
  const mapping = userLevelReverseMapping
  const onClosePasswordResetModal = () => {
    setPasswordResetModal(false)
  }
  const onCloseUserLevelModal = () => {
    setUserLevelModal(false)
  }
  const onCloseEditProfileModal = () => {
    setEditProfileModal(false)
  }
  const onCloseGrandfatherModal = () => {
    setGrandfatherModal(false)
  }
  const onCloseSponsorUpdateModal = () => {
    setSponsorUpdateModal(false)
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
  const formatDate = (dateString) => {
    console.log('date from format date ', dateString)
    if (dateString) {
      const [date, time, meridiem] = dateString?.split(' ')
      const [day, month, year] = date?.split('/')
      const formattedDatestring = `${month}/${day}/${year}`
      const currentDate = new Date(formattedDatestring)
      console.log('date from format date ', currentDate)
      return `${currentDate.getMonth() + 1}/${(currentDate.getDate())}/${currentDate.getFullYear()} ${time} ${meridiem}`
    }
  }

  return (
    <>
      <div className={`${cname}-container`}>
        <div className={`${cname}-header`}>
          <p className={`${cname}-header-text`}>User ID - {`${profileData[0]?.id}`}</p>
          { mapping[userLevel] >= 700 &&
          <p className={`${cname}-header-text ${cname}-midSection-mainInfo-text`} onClick={() => { setGrandfatherModal(true) }}>Edit Grandfather Rank</p>
          }
          { mapping[userLevel] >= 600 &&
          <p className={`${cname}-header-text ${cname}-midSection-mainInfo-text`} onClick={() => { setEditProfileModal(true) }}>Edit Profile<img src='/images/icons/edit.svg' style={{ width: '18px', height: '24px' }}/></p>
          }
        </div>

        <div className={`${cname}-midSection`}>

          <div className={`${cname}-midSection-AdditionalInfo`}>
            <div>
              <p className={`${cname}-midSection-mainInfo-name adInfoText`}>Sponsered by <a href={`/search/profile/${profileData[0]?.sponsor?.id}`}>{profileData[0]?.sponsor?.name} {profileData[0]?.sponsor?.lastname}</a></p>
              { mapping[userLevel] >= 700 &&
                <p className={`${cname}-header-text ${cname}-midSection-mainInfo-text`} onClick={() => { setSponsorUpdateModal(true) }}>Edit Sponser</p>
              }
            </div>
            <div>
              <div className={`${cname}-midSection-AdditionalInfo-icons`}>
                { (profileData[0]?.roles?.integrousAssociate || profileData[0]?.roles?.integrousCustomer) &&
                <img src='/static/badges/binary.png' style={{ width: '70px' }} />
                }
                <img src='/images/icons/deliveryMan.png' />
                <img src='/images/icons/Shopper.png' />
                <img src='/images/icons/tray.png' />
              </div>
              { mapping[userLevel] >= 600 &&
              <p style={{ textAlign: 'right' }} className={`${cname}-midSection-mainInfo-name adInfoText resetPasswordText`} onClick={() => { setPasswordResetModal(true) }}>reset Password </p>
              }

              { mapping[userLevel] === 1100 &&
              <p style={{ textAlign: 'right' }} className={`${cname}-midSection-mainInfo-name adInfoText resetPasswordText`} onClick={() => { setUserLevelModal(true) }}>Edit User Role </p>
              }
            </div>
          </div>

          <hr style={{ margin: '30px auto 10px auto' }} />
          <div className={`${cname}-footer`}>
            <div>
              <h2 className={`${cname}-footer-heading`}>Address :</h2>
              <p className={`${cname}-footer-text`}>{profileData[0]?.street}, {profileData[0]?.city}, {profileData[0]?.state}, {profileData[0]?.zip}</p>
            </div>

            <div>
              <h2 className={`${cname}-footer-heading`}>Start Date:</h2>
              <p className={`${cname}-footer-text`}>{`${formatDate(profileData[0]?.createdAt)}`}</p>
            </div>

            <div>
              <h2 className={`${cname}-footer-heading`}>Activity Log :</h2>
              { profileData[0]?.activityLog?.length > 0
                ? <div className={`${cname}-activityLog-table-container`}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Date & Time</strong></TableCell>
                          <TableCell><strong>Description</strong></TableCell>
                          <TableCell><strong>Type</strong></TableCell>
                          <TableCell><strong>User</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          profileData[0]?.activityLog?.map((activity) => (
                            <TableRow>
                              <TableCell>{formatDate(activity?.createdAt)}</TableCell>
                              <TableCell>{activity?.description}</TableCell>
                              <TableCell>{activity?.type}</TableCell>
                              <TableCell>{activity?.byUser}</TableCell>
                            </TableRow>
                            // <p className={`${cname}-footer-text`}>{activity?.description}</p>
                          ))
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                : <></>
              }
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
        <EditProfileModal editProfileModal={editProfileModal} onCloseEditProfileModal={onCloseEditProfileModal} userId={profileData[0]?.id} profileData={profileData[0]} />
        <UpdateGrandfatherModal grandfatherModal={grandfatherModal} onCloseGrandfatherModal={onCloseGrandfatherModal} userId={profileData[0]?.id} profileData={profileData[0]} />
        <SponsorUpdateModal sponsorUpdateModal={sponsorUpdateModal} onCloseSponsorUpdateModal={onCloseSponsorUpdateModal} userId={profileData[0]?.id} />
      </div>
    </>
  )
}

export default IBOProfile
