/* eslint-disable no-use-before-define */
import { Avatar, Paper } from '@mui/material'
import React from 'react'
import { getLocalStorage } from 'lib/utils/localStorage'
import axios from 'axios'
import { userLevelReverseMapping } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/formOptionData'

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
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <Avatar src={profileData[0]?.profileImage} style={{ width: '78px', height: '78px' }} />
          <div style={{ marginTop: '-15px' }}><p className={`${cname}-midSection-mainInfo-name`}>{`${profileData[0]?.name} ${profileData[0]?.lastname}`}</p>
            <p className={`${cname}-midSection-mainInfo-text`}><img src='/images/icons/email.svg'/>{`${profileData[0]?.email}`}</p></div>
        </div>
        { mapping[userLevel] >= 600 &&
        <div>
        <p className={`${cname}-midSection-mainInfo-text`} onClick={() => { handleResendEmail() }}><img src='/images/icons/flip-2.svg' style={{ width: '18px', height: '24px' }}/>resend welcome email</p>
        <p className={`${cname}-midSection-mainInfo-text`} onClick={() => { handleResendEmail2() }}><img src='/images/icons/flip-2.svg' style={{ width: '18px', height: '24px' }}/>resend welcome email-2</p>
        </div>
        }
        <p className={`${cname}-midSection-mainInfo-text`}><img src='/images/icons/edit.svg' style={{ width: '18px', height: '24px' }}/>{`${profileData[0]?.phoneNumber}`}</p>
      </div>
      <div className={`${cname}-midSection-mainInfo`}>
        <p className={`${cname}-footer-heading`}><span className={`${cname}-midSection-mainInfo-title`}>Actual Rank -</span>{`${profileData[0]?.ranks?.type.charAt(0).toUpperCase()}${profileData[0]?.ranks?.type.slice(1)}`}</p>
        <p className={`${cname}-midSection-mainInfo-text`}><span className={`${cname}-midSection-mainInfo-title`}>User Role -</span>{profileData[0]?.level}</p>
        { mapping[userLevel] >= 700 &&
        <p className={`${cname}-midSection-mainInfo-text`}><span className={`${cname}-midSection-mainInfo-title`}>GrandfatherRank -</span>{profileData[0]?.gRanks[0]?.gRank}</p>
        }
      </div>
    </>
  )
}

export default InfoBanner
