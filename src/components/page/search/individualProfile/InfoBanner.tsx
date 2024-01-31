/* eslint-disable array-callback-return */
/* eslint-disable no-use-before-define */
import { Avatar, Paper } from '@mui/material'
import React from 'react'
import { getLocalStorage } from 'lib/utils/localStorage'
import axios from 'axios'
import { userLevelReverseMapping, userProfilePictureMapping } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/formOptionData'
import { PhoneIcon } from 'components/common/icons/Phone'

function InfoBanner ({ profileData, userLevel }) {
  const cname = 'profilePage-IBOProfile'
  const mapping = userLevelReverseMapping

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
      <div className={`${cname}-midSection-mainInfo`}>
        <div className='w-full flex justify-center'>
          <Avatar src={profileData[0]?.profileImage ? profileData[0]?.profileImage : userProfilePictureMapping[profileData[0]?.ranks?.type]} style={{ width: '120px', height: '120px' }} />
        </div>
        <div>
          <div className='text-center my-2'><p className={`${cname}-midSection-mainInfo-name`}>{`${profileData[0]?.name} ${profileData[0]?.lastname}`}</p>
            <p className={`${cname}-midSection-mainInfo-text text-[#E74426]`}><img src='/images/icons/email.svg'/>{`${profileData[0]?.email}`}</p></div>
        </div>
        { mapping[userLevel] >= 600 &&
        <React.Fragment>
          { mapping[userLevel] >= 600 &&
            <p className={`${cname}-midSection-mainInfo-text`} onClick={() => { handleResendEmail() }}><img src='/images/icons/flip-2.svg' style={{ width: '18px', height: '24px' }}/>resend welcome email</p>
          }
          { mapping[userLevel] >= 600 &&
            <p className={`${cname}-midSection-mainInfo-text`} onClick={() => { handleResendEmail2() }}><img src='/images/icons/flip-2.svg' style={{ width: '18px', height: '24px' }}/>resend welcome email-2</p>
          }
        </React.Fragment>
        }
        <p className={`${cname}-midSection-mainInfo-text`}><PhoneIcon classes='w-5 h-5' />{`${profileData[0]?.phoneNumber}`}</p>
      </div>
      <div className={`${cname}-midSection-mainInfo`}>
        <p className={`${cname}-footer-heading`}><span className={`${cname}-midSection-mainInfo-title`}>Snap Rank - </span>{`${profileData[0]?.ranks?.type.charAt(0).toUpperCase()}${profileData[0]?.ranks?.type.slice(1)}`}</p>
        <p className={`${cname}-midSection-mainInfo-text`}><span className={`${cname}-midSection-mainInfo-title`}>Snap Type -</span>{snapType(profileData[0]?.roles)}</p>
        <p className={`${cname}-midSection-mainInfo-text`}><span className={`${cname}-midSection-mainInfo-title`}>User Role -</span>{profileData[0]?.level}</p>
        { mapping[userLevel] >= 700 &&
        <p className={`${cname}-midSection-mainInfo-text`}><span className={`${cname}-midSection-mainInfo-title`}>GrandfatherRank -</span>{profileData[0]?.gRanks[0]?.status ? <span>{profileData[0]?.gRanks[0]?.gRank} {profileData[0]?.gRanks[0].gRank ? <span>(until: {profileData[0]?.gRanks[0]?.to.split(' ')[0]})</span> : <></>}</span> : <></>}</p>
        }
      </div>
    </>
  )
}

export default InfoBanner
