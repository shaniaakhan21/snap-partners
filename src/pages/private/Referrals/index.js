import React, { useContext, useEffect, useState } from 'react'
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
import { Searcher } from '../../../components/Searcher';
import { SearchModalContext, TYPES } from '../../../contexts/SearchModal';
import useWindowSize from '../../../hooks/useWindowSize';
import referCustomersCardSrc from '../../../../svg/referCustomersCard.svg'
import referDriversCardSrc from '../../../../svg/referDriversCard.svg'
import referMerchantsCardSrc from '../../../../svg/referMerchantsCard.svg'
import { dataTest } from '../../../test/dataEmails'

const selectInfo = {
  selectDefaultValue: 'name',
  selectOptions: [
    {
      value: 'id',
      text: 'ID',
    },
    {
      value: 'name',
      text: 'Fullname',
    },
    {
      value: 'email',
      text: 'Email',
    },
    {
      value: 'phone',
      text: 'Phone',
    }
  ]
}

export const Referrals = () => {
  const { searchModalState, searchModalDispatch } = useContext(SearchModalContext)
  const { width: windowWidth } = useWindowSize()

  const [tabOpen, setTabOpen] = useState('1')
  const [userDetailIdOpen, setUserdetailIdOpen] = useState(0)
  const [modalReferralListlIsOpen, setModalReferralListIsOpen] = useState(false)
  const [modalReferralUserDetailIsOpen, setModalReferralUserDetailIsOpen] = useState(false)
  const [data, setData] = useState({
    emailNotificationsArray: null,
    emailNotificationsUserData: null,
    usersArray: null,
    userDetailOpenData: null
  })

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

  const handleClickModalReferralSearchClose = (e, element) => {
    if (element === e.target) {
      document.body.style.overflowY = 'auto'
      searchModalDispatch({ type: TYPES.SEARCH_MODAL_REFERRALS_UPDATE, payload: false })
    }
  }

  // INIT DATA
  useEffect(() => {
    const emailNotificationsArray = [...dataTest.emailNotifications]
    const emailNotificationsUserData = { ...emailNotificationsArray.find((emailNotification) => emailNotification.level === parseInt(tabOpen)) } 

    const usersArray = []
    emailNotificationsArray.forEach((emailNotification) => {
      emailNotification.usersData.users.forEach((user) => {
        usersArray.push(user)
      })
    })

    setData((prevState) => ({
      ...prevState,
      emailNotificationsArray,
      emailNotificationsUserData,
      usersArray
    }))
  }, [])

  // tabOpen State HandleChange
  useEffect(() => {
    if (!data.emailNotificationsArray) return

    const emailNotificationsUserData = { ...data.emailNotificationsArray.find((emailNotification) => emailNotification.level === parseInt(tabOpen)) } 

    setData((prevState) => ({
      ...prevState,
      emailNotificationsUserData,
    }))
  }, [tabOpen])

  // userDetailOpen State HandleChange
  useEffect(() => {
    if (!data.emailNotificationsUserData) return

    const userDetailOpenData = data.emailNotificationsUserData.usersData.users.find((user) => user.id === userDetailIdOpen.toString())

    setData((prevState) => ({
      ...prevState,
      userDetailOpenData
    }))
  }, [userDetailIdOpen])

  if (
    !data.emailNotificationsArray || 
    !data.emailNotificationsUserData || 
    !data.usersArray
  ) return <h1>Loading</h1>

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
          {data.emailNotificationsArray.map((emailNotification) => (
              <ReferralTabListItem 
                key={emailNotification.level}
                isSelect={emailNotification.level === parseInt(tabOpen)}
                id={emailNotification.level}
                newUsers={emailNotification.newUsers}
                numUsers={emailNotification.quantity}
                onClick={windowWidth >= 960 ? handleClickTab : handleClickModalReferralListOpen}
              />
          ))}
        </ReferralTabList>

        {/* List in desktop */}
        {windowWidth >= 960 && (
          <ReferralListSelected id={data.emailNotificationsUserData.level} newUsers={data.emailNotificationsUserData.newUsers}>
            {data.emailNotificationsUserData.usersData.users.map((user) => (
              <ReferralListSelectedItem 
                key={user.id}
                userId={user.id}
                numUsers={user.numUsers}
                userName={user.name}
                onClick={handleClickModalReferralDetailOpen}
              />
            ))}
          </ReferralListSelected>
        )}

        {/* List with modal in mobile */}
        {windowWidth < 960 && modalReferralListlIsOpen && (
          <Overlay onClick={handleClickModalReferralListClose}>
            <ModalContainer>
              <ReferralListSelected 
                id={data.emailNotificationsUserData.level} 
                newUsers={data.emailNotificationsUserData.newUsers}
              >
                {data.emailNotificationsUserData.usersData.users.map((user) => (
                  <ReferralListSelectedItemMobile 
                    key={user.id}
                    userId={user.id}
                    numUsers={user.numUsers}
                    userName={user.name}
                    onClick={handleClickModalReferralDetailOpen}
                  />
                ))}
              </ReferralListSelected>
            </ModalContainer>
          </Overlay>
        )}

        {/* Modal View More */}
        {modalReferralUserDetailIsOpen && data.userDetailOpenData && (
          <Overlay onClick={handleClickModalReferralDetailClose}>
            <ModalContainer>
              <ReferralsUserDetailModal
                userId={data.userDetailOpenData.id}
                userName={data.userDetailOpenData.name}
                userEmail={data.userDetailOpenData.email}
                userPhone={data.userDetailOpenData.phone}
                onClick={handleClickModalReferralDetailClose}
              />
            </ModalContainer>
          </Overlay>
        )}

        {searchModalState.referralsIsOpen && data.usersArray && (
          <Overlay onClick={handleClickModalReferralSearchClose}>
            <ModalContainer>
              <Searcher 
                data={data.usersArray}
                selectInfo={selectInfo}
                searchPlaceholderMsg='Search user...'
              />
            </ModalContainer>
          </Overlay>
        )}
      </div>
    </>
  )
}
