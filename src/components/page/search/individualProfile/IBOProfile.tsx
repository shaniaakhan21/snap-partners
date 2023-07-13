/* eslint-disable no-use-before-define */
import { Avatar } from '@mui/material'
import React from 'react'

function IBOProfile ({ profileData }) {
  const cname = 'profilePage-IBOProfile'
  console.log('data from ibo', profileData)
  return (
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
            <p className={`${cname}-footer-heading`}>{`${profileData[0]?.ranks?.percentage}`}</p>
            <p className={`${cname}-midSection-mainInfo-name adInfoText`}>Sponsered by </p>
          </div>
          <div>
            <div className={`${cname}-midSection-AdditionalInfo-icons`}>
              <img src='/images/icons/deliveryMan.png' />
              <img src='/images/icons/shopper.png' />
              <img src='/images/icons/tray.png' />
            </div>
            <p className={`${cname}-midSection-mainInfo-name adInfoText`}>reset Password </p>
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
    </div>
  )
}

export default IBOProfile
