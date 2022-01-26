import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
// import { ReferralCards, ReferralListSelected, ReferralTabList } from '../../../components';
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
// Se deben ordenar las importaciones

const dataTest = {
  emailNotifications: [
    {
      level: 1,
      newUsers: 3,
      quantity: 5,
      usersData: {
        users: [
          {
            id: 23483847,
            name: 'James Hunt',
            numUsers: 20,
            email: 'jameshunt@gmail.com',
            phone: '+1 332 213 531'
          },
          {
            id: 93847282,
            name: 'William Jones',
            numUsers: 27,
            email: 'williamjone@gmail.com',
            phone: '+1 829 392 0198'
          },
          {
            id: 22293896,
            name: 'Oliver Taylor',
            numUsers: 13,
            email: 'olivertaylor@gmail.com',
            phone: '+1 989 839 9203'
          },
          {
            id: 93472729,
            name: 'Robbie Jhonson',
            numUsers: 2,
            email: 'robbiejhonson@gmail.com',
            phone: '+1 828 019 9302'
          },
          {
            id: 38472729,
            name: 'Charles Williams',
            numUsers: 9,
            email: 'charleswilliams@gmail.com',
            phone: '+1 993 000 2931'
          },
        ]
      }
    },
    {
      level: 2,
      newUsers: 2,
      quantity: 4,
      usersData: {
        users: [
          {
            id: 98483829,
            name: 'Tomas Robinson',
            numUsers: 88,
            email: 'tomasrobinson@gmail.com',
            phone: '+1 281 235 9489'
          },
          {
            id: 94938394,
            name: 'James Evans',
            numUsers: 42,
            email: 'jamesevans@gmail.com',
            phone: '+1 829 992 9320'
          },
          {
            id: 12293838,
            name: 'Jhon Cano',
            numUsers: 7,
            email: 'jhoncano@gmail.com',
            phone: '+1 929 919 9291'
          },
          {
            id: 88389201,
            name: 'Peter Díaz',
            numUsers: 24,
            email: 'peterdiaz@gmail.com',
            phone: '+1 817 142 942'
          }
        ]
      }
    },
    {
      level: 3,
      newUsers: 1,
      quantity: 5,
      usersData: {
        users: [
          {
            id: 14938738,
            name: 'Ana Brown',
            numUsers: 20,
            email: 'anabrown@gmail.com',
            phone: '+1 121 371 2212'
          },
          {
            id: 11109890,
            name: 'Jacob Jones',
            numUsers: 27,
            email: 'jacobjones@gmail.com',
            phone: '+1 192 128 9999'
          },
          {
            id: 77837462,
            name: 'Isabella Hunt',
            numUsers: 13,
            email: 'isabellahunt@gmail.com',
            phone: '+1 919 919 2819'
          },
          {
            id: 88928371,
            name: 'Mia Jone',
            numUsers: 2,
            email: 'isabellahunt@gmail.com',
            phone: '+1 121 242 2512'
          },
          {
            id: 88293847,
            name: 'Sophia Thomas',
            numUsers: 9,
            email: 'sophiatomas@gmail.com',
            phone: '+1 888 637 9283'
          },
        ]
      }
    },
    {
      level: 4,
      newUsers: 5,
      quantity: 5,
      usersData: {
        users: [
          {
            id: 11090807,
            name: 'Noah Wilson',
            numUsers: 20,
            email: 'noahwilson@gmail.com',
            phone: '+1 777 727 2125'
          },
          {
            id: 41927402,
            name: 'Mason Miller',
            numUsers: 27,
            email: 'masonmiller@gmail.com',
            phone: '+1 121 829 7483'
          },
          {
            id: 87969523,
            name: 'Aiden Davis',
            numUsers: 13,
            email: 'aidendavis@gmail.com',
            phone: '+1 565 342 8491'
          },
          {
            id: 99990121,
            name: 'Alessandro Wilson',
            numUsers: 2,
            email: 'alessandrowilson@gmail.com',
            phone: '+1 823 834 7657'
          },
          {
            id: 77735290,
            name: 'Mattia Martin',
            numUsers: 9,
            email: 'mattiamartin@gmail.com',
            phone: '+1 882 898 7361'
          },
        ]
      }
    },
    {
      level: 5,
      newUsers: 3,
      quantity: 4,
      usersData: {
        users: [
          {
            id: 67628394,
            name: 'Harry Lee',
            numUsers: 20,
            email: 'harrylee@gmail.com',
            phone: '+1 129 019 7361'
          },
          {
            id: 22123123,
            name: 'Ron Gales',
            numUsers: 27,
            email: 'rongales@gmail.com',
            phone: '+1 111 282 2311'
          },
          {
            id: 22839031,
            name: 'Jack Smith',
            numUsers: 13,
            email: 'jacksmith@gmail.com',
            phone: '+1 324 221 7277'
          },
          {
            id: 99201929,
            name: 'Sara Clark',
            numUsers: 2,
            email: 'saraclark@gmail.com',
            phone: '+1 848 123 9821'
          },
        ]
      }
    },
  ]
}

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

  const handleClickReferralDetailOpen = (userId) => {
    setUserdetailIdOpen(userId)
    document.body.style.overflowY = 'hidden'
    setModalReferralUserDetailIsOpen(true)
  }

  const handleClickReferralDetailClose = (e) => {
    const idElementClicked = e.target.id

    if (idElementClicked === 'overlay' || idElementClicked === 'cancel-button') {
      document.body.style.overflowY = 'auto'
      setModalReferralUserDetailIsOpen(false)
    }
  }

  const handleClickModalOpen = (id) => {
    handleClickTab(id)
    document.body.style.overflowY = 'hidden'
    setModalReferralListIsOpen(true)
  }

  const handleClickModalClose = (e) => {
    if (e.target.id === 'overlay') {
      document.body.style.overflowY = 'auto'
      setModalReferralListIsOpen(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Snap Delivered | Referrals</title>
      </Helmet>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
        <ReferralCards
          title='Refer Customers'
          imgSrc={referCustomersCardSrc}
          imgAlt='Representative image of Refer Customer'
          link='Linkhereytocopywhenclick.com'
          newUser
          styles={{ marginRight: '0.5rem' }}
        />
        <ReferralCards 
          title='Refer Drivers'
          imgSrc={referDriversCardSrc}
          imgAlt='Representative image of Refer Drivers'
          link='Linkhereytocopywhenclick.com'
          styles={{ margin: '0 0.5rem' }}
        />
        <ReferralCards 
          title='Refer Customers'
          imgSrc={referMerchantsCardSrc}
          imgAlt='Representative image of Refer Merchant'
          link='Linkhereytocopywhenclick.com'
          newUser
          styles={{ marginLeft: '0.5rem' }}
        />
      </div>

      <div style={{ display: 'flex', marginTop: '1rem', width: '100%' }}>
        <ReferralTabList>
          {emailNotificationsArray.map((emailNotify) => (
            <ReferralTabListItem 
              key={emailNotify.level}
              isSelect={emailNotify.level === parseInt(tabOpen)}
              id={emailNotify.level}
              newUsers={emailNotify.newUsers}
              numUsers={emailNotify.quantity}
              onClick={windowWidth >= 960 ? handleClickTab : handleClickModalOpen}
            />
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
                onClick={handleClickReferralDetailOpen}
              />
            ))}
          </ReferralListSelected>
        )}

        {/* List with modal in mobile */}
        {windowIsMobileSize && modalReferralListlIsOpen && (
          <Overlay onClick={handleClickModalClose}>
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
                    onClick={handleClickReferralDetailOpen}
                  />
                ))}
              </ReferralListSelected>
            </ModalContainer>
          </Overlay>
        )}

        {/* Modal See More */}
        {modalReferralUserDetailIsOpen && (
          <Overlay onClick={handleClickReferralDetailClose}>
            <ModalContainer>
              <ReferralsUserDetailModal
                userId={userDetailOpenData.id}
                userName={userDetailOpenData.name}
                userEmail={userDetailOpenData.email}
                userPhone={userDetailOpenData.phone}
                onClick={handleClickReferralDetailClose}
              />
            </ModalContainer>
          </Overlay>
        )}
      </div>
    </>
  )
}

// { title, imgSrc, imgAlt, link, newUser = false }