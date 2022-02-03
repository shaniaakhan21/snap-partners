import { useEffect, useState } from 'react'
import Head from 'next/head'
import DashboardLayout from 'layouts/private/Dashboard'
import { ReferralCards } from 'components/page/referrals/Cards'
import { ReferralTabList } from 'components/page/referrals/TabList'
import { CustomerIcon, DriverIcon, MerchantIcon } from 'components/common/icons'
import { ReferralTabListItem } from 'components/page/referrals/TabListItem'
import { useWindowSize } from 'lib/hooks/useWindowSize'
import { ReferralListSelected } from 'components/page/referrals/ListSelected'
import { ReferralListSelectedItem } from 'components/page/referrals/ListSelectedItem'
import { Overlay } from 'components/common/Overlay'
import { ModalContainer } from 'components/common/ModalContainer'
import { ReferralListSelectedItemMobile } from 'components/page/referrals/ListSelectedItemMobile'
import { ReferralsUserDetailModal } from 'components/page/referrals/UserDetailModal'
import { Searcher } from 'components/common/Search'
import { useSearchModalStore } from 'lib/stores/SearchModal'
import { dataTest } from 'lib/utils/dataEmails'
import { config } from 'config'
import type { Page, ReactNode } from 'lib/types'

const { PAGE_INFO: { SEO } } = config

const selectInfo = {
  selectDefaultValue: 'name',
  selectOptions: [
    {
      value: 'id',
      text: 'ID'
    },
    {
      value: 'name',
      text: 'Fullname'
    },
    {
      value: 'email',
      text: 'Email'
    },
    {
      value: 'phone',
      text: 'Phone'
    }
  ]
}

const ReferralsPage: Page = () => {
  const { referralsIsOpen, setReferralIsOpen } = useSearchModalStore()
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
      setReferralIsOpen(false)
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
      emailNotificationsUserData
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
      <Head>
        <title>{SEO.TITLE_PAGE} - Referrals</title>
      </Head>

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center justify-items-center gap-4'>
        <ReferralCards
          title='Refer Customers'
          ilustration={<CustomerIcon />}
          link='Linkhereytocopywhenclick.com'
          newUser
          classes='col-span-1'
        />
        <ReferralCards
          title='Driver Customers'
          ilustration={<DriverIcon />}
          link='Linkhereytocopywhenclick.com'
          classes='col-span-1'
        />
        <ReferralCards
          title='Merchant Customers'
          ilustration={<MerchantIcon />}
          link='Linkhereytocopywhenclick.com'
          newUser
          classes='col-span-1'
        />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 justify-center justify-items-center gap-4 mt-4'>
        <ReferralTabList classes='col-span-1'>
          {data.emailNotificationsArray.map((emailNotification) => (
            <ReferralTabListItem
              key={emailNotification.level}
              isSelect={emailNotification.level === parseInt(tabOpen)}
              id={emailNotification.level}
              newUsers={emailNotification.newUsers}
              numUsers={emailNotification.quantity}
              onClick={windowWidth >= 1024 ? handleClickTab : handleClickModalReferralListOpen}
            />
          ))}
        </ReferralTabList>

        {/* List in desktop */}
        {windowWidth >= 1024 && (
          <ReferralListSelected
            id={data.emailNotificationsUserData.level}
            newUsers={data.emailNotificationsUserData.newUsers}
            numUsers={data.emailNotificationsUserData.quantity}
            classes='col-span-2'
          >
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
      </div>

      {/* List with modal in mobile */}
      {windowWidth < 1024 && modalReferralListlIsOpen && (
        <Overlay onClick={handleClickModalReferralListClose}>
          <ModalContainer>
            <ReferralListSelected
              id={data.emailNotificationsUserData.level}
              newUsers={data.emailNotificationsUserData.newUsers}
              numUsers={data.emailNotificationsUserData.quantity}
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
              id={data.userDetailOpenData.id}
              name={data.userDetailOpenData.name}
              email={data.userDetailOpenData.email}
              phone={data.userDetailOpenData.phone}
              onClick={handleClickModalReferralDetailClose}
            />
          </ModalContainer>
        </Overlay>
      )}

      {referralsIsOpen && data.usersArray && (
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

    </>
  )
}

ReferralsPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)

export default ReferralsPage
