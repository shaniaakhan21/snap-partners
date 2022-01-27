import React, { Fragment, useState } from 'react'
import { Helmet } from 'react-helmet';
import { ReferralCards } from '../../../components/ReferralCards';
import { ReferralListSelected } from '../../../components/ReferralListSelected';
import { ReferralTabList } from '../../../components/ReferralTabList'
import { ReferralListSelectedItem } from '../../../components/ReferralListSelected/ReferralListSelectedItem';
import { ReferralTabListItem } from '../../../components/ReferralTabList/ReferralTabListItem';
import { Overlay } from '../../../components/Overlay';
import { ModalContainer } from '../../../components/ModalContainer';
import { ReferralListSelectedItemMobile } from '../../../components/ReferralListSelectedItemMobile';
import { ReferralsUserDetailModal } from '../../../components/ReferralsUserDetailModal';
import useWindowSize from '../../../hooks/useWindowSize';
import referCustomersCardSrc from '../../../../svg/referCustomersCard.svg'
import referDriversCardSrc from '../../../../svg/referDriversCard.svg'
import referMerchantsCardSrc from '../../../../svg/referMerchantsCard.svg'
import { dataTest } from '../../../test/dataEmails'

export default function Referrals() {
  const { width: windowWidth } = useWindowSize()

  const [tabOpen, setTabOpen] = useState('1')
  const [userDetailIdOpen, setUserdetailIdOpen] = useState(0)
  const [modalReferralListlIsOpen, setModalReferralListIsOpen] = useState(false)
  const [modalReferralUserDetailIsOpen, setModalReferralUserDetailIsOpen] = useState(false)

  const emailNotificationsArray = [...dataTest.emailNotifications]
  const emailNotificationsUserData = { ...emailNotificationsArray.find((emailNotify) => emailNotify.level === parseInt(tabOpen)) } 
  const userDetailOpenData = emailNotificationsUserData.usersData.users.find((user) => user.id === userDetailIdOpen)

  const windowIsMobileSize = windowWidth < 960

  const handleClickTab = (id) => {
    setTabOpen(id)
  } 

  const handleClickModalReferralListOpen = (id) => {
    handleClickTab(id)
    document.body.style.overflowY = 'hidden'
    setModalReferralListIsOpen(true)
  }

  const handleClickModalReferralListClose = (e, element) => {
    if (element === e.target) {
      document.body.style.overflowY = 'auto'
      setModalReferralListIsOpen(false)
    }
  }

  const handleClickModalReferralDetailOpen = (userId) => {
    setUserdetailIdOpen(userId)
    document.body.style.overflowY = 'hidden'
    setModalReferralUserDetailIsOpen(true)
  }

  const handleClickModalReferralDetailClose = (e, element) => {
    if (element === e.target) {
      document.body.style.overflowY = 'auto'
      setModalReferralUserDetailIsOpen(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Snap Delivered | Referrals</title>
      </Helmet>

      <div style={{ display: 'grid', alignItems: 'center', justifyContent: 'center', justifyItems: 'center', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(264px, 1fr))' }}>
        <ReferralCards
          title='Refer Customers'
          imgSrc={referCustomersCardSrc}
          imgAlt='Representative image of Refer Customer'
          link='Linkhereytocopywhenclick.com'
          newUser
        />
        <ReferralCards 
          title='Refer Drivers'
          imgSrc={referDriversCardSrc}
          imgAlt='Representative image of Refer Drivers'
          link='Linkhereytocopywhenclick.com'
        />
        <ReferralCards 
          title='Refer Customers'
          imgSrc={referMerchantsCardSrc}
          imgAlt='Representative image of Refer Merchant'
          link='Linkhereytocopywhenclick.com'
          newUser
        />
      </div>

      <div style={{ display: 'flex', marginTop: '1rem', width: '100%' }}>
        <ReferralTabList>
          {emailNotificationsArray.map((emailNotify) => (
            <Fragment key={emailNotify.level}>
              <ReferralTabListItem 
                isSelect={emailNotify.level === parseInt(tabOpen)}
                id={emailNotify.level}
                newUsers={emailNotify.newUsers}
                numUsers={emailNotify.quantity}
                onClick={windowWidth >= 960 ? handleClickTab : handleClickModalReferralListOpen}
              />
              <ReferralTabListItem 
                isSelect={emailNotify.level === parseInt(tabOpen)}
                id={emailNotify.level}
                newUsers={emailNotify.newUsers}
                numUsers={emailNotify.quantity}
                onClick={windowWidth >= 960 ? handleClickTab : handleClickModalReferralListOpen}
              />
            </Fragment>
          ))}
        </ReferralTabList>

        {/* List in desktop */}
        {!windowIsMobileSize && (
          <ReferralListSelected id={emailNotificationsUserData.level} newUsers={emailNotificationsUserData.newUsers}>
            {emailNotificationsUserData.usersData.users.map((user) => (
              <ReferralListSelectedItem 
                key={user.id}
                numUsers={user.numUsers}
                userId={user.id}
                userName={user.name}
                onClick={handleClickModalReferralDetailOpen}
              />
            ))}
          </ReferralListSelected>
        )}

        {/* List with modal in mobile */}
        {windowIsMobileSize && modalReferralListlIsOpen && (
          <Overlay onClick={handleClickModalReferralListClose}>
            <ModalContainer>
              <ReferralListSelected 
                id={emailNotificationsUserData.level} 
                newUsers={emailNotificationsUserData.newUsers}
              >
                {emailNotificationsUserData.usersData.users.map((user) => (
                  <ReferralListSelectedItemMobile 
                    key={user.id}
                    numUsers={user.numUsers}
                    userId={user.id}
                    userName={user.name}
                    onClick={handleClickModalReferralDetailOpen}
                  />
                ))}
              </ReferralListSelected>
            </ModalContainer>
          </Overlay>
        )}

        {/* Modal View More */}
        {modalReferralUserDetailIsOpen && (
          <Overlay onClick={handleClickModalReferralDetailClose}>
            <ModalContainer>
              <ReferralsUserDetailModal
                userId={userDetailOpenData.id}
                userName={userDetailOpenData.name}
                userEmail={userDetailOpenData.email}
                userPhone={userDetailOpenData.phone}
                onClick={handleClickModalReferralDetailClose}
              />
            </ModalContainer>
          </Overlay>
        )}
      </div>
    </>
  )
}
