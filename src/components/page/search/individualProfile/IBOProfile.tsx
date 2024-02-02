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
import UpdateSnapTypeModal from './modalPopups/UpdateSnapType'
import InfoBanner from './InfoBanner'
import EditIcon from '@material-ui/icons/Edit'
import PlaceIcon from '@mui/icons-material/Place'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

function IBOProfile ({ profileData, userLevel }) {
  const [passwordResetModal, setPasswordResetModal] = useState<boolean>(false)
  const [userLevelModal, setUserLevelModal] = useState<boolean>(false)
  const [editProfileModal, setEditProfileModal] = useState<boolean>(false)
  const [grandfatherModal, setGrandfatherModal] = useState<boolean>(false)
  const [sponsorUpdateModal, setSponsorUpdateModal] = useState<boolean>(false)
  const [snapTypeModal, setSnapTypeModal] = useState<boolean>(false)
  const [newPassword, setNewPassword] = useState({
    password: ''
  })
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyClick = () => {
    const userId = profileData[0]?.id
    navigator.clipboard.writeText(userId)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 1000)
      })
      .catch((error) => {
        console.error('Error copying sponsor ID:', error)
      })
  }
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
  const onCloseSnapTypeModal = () => {
    setSnapTypeModal(false)
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
      <div className={`${cname}-container mb-8`}>
        <div className={`${cname}-midSection`}>

          <div className={`${cname}-midSection-AdditionalInfo flex justify-between items-center`}>
            <div className='w-[30%]'>
              <p className='text-[#E74426] font-semibold text-base flex items-center'><span className='text-black'>User ID </span>{`${profileData[0]?.id}`}<ContentCopyIcon className='text-base ml-1 text-[#909EAA]' onClick={handleCopyClick}/>{isCopied && <span className='ml-1 text-[#E74426] text-xs'>Copied!</span>}</p>
            </div>
            <div className='w-[70%] flex justify-end items-center'>
              <div className='flex items-center'>
                <p className={`${cname}-midSection-mainInfo-name mt-1 capitalize text-[#7C7C7C] font-semibold`}>Sponsered by <a href={`/search/profile/${profileData[0]?.sponsor?.id}`} className='text-[#E74426]'>{profileData[0]?.sponsor?.name} {profileData[0]?.sponsor?.lastname}</a><EditIcon className='text-white bg-[#E74426] p-1 rounded-full ml-1 mr-4  mb-1 cursor-pointer' onClick={() => { setSponsorUpdateModal(true) }}/></p>
              </div>
              <div>
                <div className={`${cname}-midSection-AdditionalInfo-icons`}>
                  { (profileData[0]?.roles?.integrousAssociate || profileData[0]?.roles?.integrousCustomer) &&
                <img src='/static/badges/binary.png' style={{ width: '70px' }} />
                  }
                  {
                    profileData[0]?.business_approved && <img className='w-[54px] cursor-pointer pr-1' src='/images/b_cert.png' alt='Business Approved Certificate' title='Business Approved Certificate'/>
                  }
                  {
                    profileData[0]?.isCertified && <img className='w-[52px] h-[51px] cursor-pointer pr-1' src='/static/wellness/weight-care-certified.png' alt='WeightCare Certificate' title='WeightCare Certificate'/>
                  }
                  <img src='/images/icons/deliveryMan.png' className='pr-1' />
                  <img src='/images/icons/Shopper.png' className='pr-1' />
                  <img src='/images/icons/tray.png' className='pr-1' />
                </div>
              </div>
            </div>
          </div>
          <div className={`${cname}-footer`}>
            <div className='flex flex-row bg-[#F9FBFE] py-2 px-6 rounded-xl border-[#DCE5ED] border my-4'>
              <div className='w-7/12'>
                <h2 className={`${cname}-footer-heading text-black`}>Address</h2>
                {profileData[0]?.street || profileData[0]?.city || profileData[0]?.state || profileData[0]?.zip
                  ? (
                    <p className={`${cname}-footer-text flex items-center`}>
                      <PlaceIcon className='text-[#909EAA] text-lg mr-[1px]' />
                      {profileData[0]?.street}, {profileData[0]?.city}, {profileData[0]?.state}, {profileData[0]?.zip}
                    </p>
                  )
                  : (
                    <p className={`${cname}-footer-text flex items-center`}>
                      <PlaceIcon className='text-[#909EAA] text-lg mr-[1px]' />
                      Not Available
                    </p>
                  )}
              </div>

              <div className='w-5/12'>
                <h2 className={`${cname}-footer-heading text-black`}>Start Date</h2>
                <p className={`${cname}-footer-text flex items-center`}><CalendarTodayIcon className='text-[#909EAA] text-lg mr-[1px]'/> {`${profileData[0]?.createdAtUs}`}</p>
              </div>
            </div>

            <div>
              <h2 className={`${cname}-footer-heading text-black pt-4`}>Activity Log</h2>
              { profileData[0]?.activityLog?.length > 0
                ? <div className={`${cname}-activityLog-table-container`}>
                  <TableContainer className='rounded-2xl mt-4 border'>
                    <Table>
                      <TableHead>
                        <TableRow className='bg-[#F0F4F8] border-b-2 border-[#DCE5ED]'>
                          <TableCell className='text-black font-medium'><strong>Date & Time</strong></TableCell>
                          <TableCell className='text-black font-medium'><strong>Description</strong></TableCell>
                          <TableCell className='text-black font-medium'><strong>Type</strong></TableCell>
                          <TableCell className='text-black font-medium'><strong>User</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          profileData[0]?.activityLog?.map((activity) => (
                            <TableRow>
                              <TableCell className='border-b border-[#EFF3F8] text-black font-medium'>{activity?.createdAt}</TableCell>
                              <TableCell className='border-b border-[#EFF3F8] text-black font-medium'>{activity?.description}</TableCell>
                              <TableCell className='border-b border-[#EFF3F8] text-black font-medium'>{activity?.type}</TableCell>
                              <TableCell className='border-b border-[#EFF3F8] text-black font-medium'>{activity?.byUser}</TableCell>
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

        <UpdateUserLevelModal userLevelModal={userLevelModal} onCloseUserLevelModal={onCloseUserLevelModal} userId={profileData[0]?.id} />
        <EditProfileModal editProfileModal={editProfileModal} onCloseEditProfileModal={onCloseEditProfileModal} userId={profileData[0]?.id} profileData={profileData[0]} />
        <UpdateGrandfatherModal grandfatherModal={grandfatherModal} onCloseGrandfatherModal={onCloseGrandfatherModal} userId={profileData[0]?.id} profileData={profileData[0]} />
        <SponsorUpdateModal sponsorUpdateModal={sponsorUpdateModal} onCloseSponsorUpdateModal={onCloseSponsorUpdateModal} userId={profileData[0]?.id} />
        <UpdateSnapTypeModal snapTypeModal={snapTypeModal} onCloseSnapTypeModal={onCloseSnapTypeModal} userId={profileData[0]?.id} userRoles={profileData[0]?.roles} />
      </div>
    </>
  )
}

export default IBOProfile
