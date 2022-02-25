import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { PAGE_INFO } from 'config/pageInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import { dataTest } from 'lib/utils/dataEmails'
import { Overlay } from 'components/common/Overlay'
import { ModalContainer } from 'components/common/ModalContainer'
import { Searcher } from 'components/common/Search'
import { ReferralListSelectedItemMobile } from 'components/page/referrals/ListSelectedItemMobile'
import { ReferralListSelected } from 'components/page/referrals/ListSelected'
import { ReferralsUserDetailModal } from 'components/page/referrals/UserDetailModal'
import { ReferralTabListItem } from 'components/page/referrals/TabListItem'
import { ReferralTabList } from 'components/page/referrals/TabList'
import { useReferralsData } from 'lib/hooks/useReferralsData'
import { useState } from 'react'
import { useModal } from 'lib/hooks/useModal'
import { useWindowSize } from 'lib/hooks/useWindowSize'
import { useAuthStore, useSearchModalStore } from 'lib/stores'
import { ReferralListSelectedItem } from 'components/page/referrals/ListSelectedItem'
import { Spinner } from 'components/common/loaders'

const { SEO } = PAGE_INFO

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

const GenealogyPage: Page = () => {
  const { auth } = useAuthStore()
  const { referralsIsOpen, closeReferral } = useSearchModalStore()
  const { width: windowWidth } = useWindowSize()
  const {
    isOpen: modalReferralListlIsOpen,
    fnOpenModal: fnOpenModalReferralList,
    fnCloseModal: fnCloseModalReferralList
  } = useModal(false)
  const {
    isOpen: modalReferralUserDetailIsOpen,
    fnOpenModal: fnOpenModalReferralUserDetail,
    fnCloseModal: fnCloseModalReferralUserDetail
  } = useModal(false)
  const [tabOpen, setTabOpen] = useState('1')
  const [userDetailIdOpen, setUserdetailIdOpen] = useState(0)

  const {
    emailNotificationsArray,
    emailNotificationsUserData,
    userDetailOpenData,
    usersArray
  } = useReferralsData(auth, dataTest, tabOpen, userDetailIdOpen)

  const handleClickTab = (id: string) => setTabOpen(id)

  if (
    !emailNotificationsArray ||
    !emailNotificationsUserData ||
    !usersArray
  ) {
    return (
      <>
        <div className='w-full h-full flex items-center justify-center'>
          <Spinner />
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - Genealogy</title>
      </Head>

      <div className='grid grid-cols-1 lg:grid-cols-3 justify-center justify-items-center gap-4 mt-4'>
        <ReferralTabList classes='col-span-1'>
          {[
            ...emailNotificationsArray
          ].map((emailNotification) => (
            <ReferralTabListItem
              key={emailNotification.level}
              isSelect={emailNotification.level === parseInt(tabOpen)}
              id={emailNotification.level}
              newUsers={emailNotification.newUsers}
              numUsers={emailNotification.quantity}
              onClick={windowWidth >= 1024 ? handleClickTab : (id) => fnOpenModalReferralList(() => handleClickTab(id))}
            />
          ))}
        </ReferralTabList>

        {/* List in desktop */}
        {windowWidth >= 1024 && (
          <ReferralListSelected
            id={emailNotificationsUserData.level}
            newUsers={emailNotificationsUserData.newUsers}
            numUsers={emailNotificationsUserData.quantity}
            classes='col-span-2'
          >
            {[
              ...emailNotificationsUserData.usersData.users
            ].map((user) => (
              <ReferralListSelectedItem
                key={user.id}
                userId={user.id}
                numUsers={user.numUsers}
                userName={user.name}
                onClick={(id) => fnOpenModalReferralUserDetail(() => setUserdetailIdOpen(id))}
              />
            ))}
          </ReferralListSelected>
        )}
      </div>

      {/* List with modal in mobile */}
      {windowWidth < 1024 && modalReferralListlIsOpen && (
        <Overlay onClick={fnCloseModalReferralList}>
          <ModalContainer>
            <ReferralListSelected
              id={emailNotificationsUserData.level}
              newUsers={emailNotificationsUserData.newUsers}
              numUsers={emailNotificationsUserData.quantity}
            >
              {[...emailNotificationsUserData.usersData.users, ...emailNotificationsUserData.usersData.users].map((user) => (
                <ReferralListSelectedItemMobile
                  key={user.id}
                  userId={user.id}
                  numUsers={user.numUsers}
                  userName={user.name}
                  onClick={(id) => fnOpenModalReferralUserDetail(() => setUserdetailIdOpen(id))}
                />
              ))}
            </ReferralListSelected>
          </ModalContainer>
        </Overlay>
      )}

      {/* Modal View More */}
      {modalReferralUserDetailIsOpen && userDetailOpenData && (
        <Overlay onClick={fnCloseModalReferralUserDetail}>
          <ModalContainer>
            <ReferralsUserDetailModal
              referralUsers={[]}
              id={userDetailOpenData.id}
              name={userDetailOpenData.name}
              email={userDetailOpenData.email}
              phone={userDetailOpenData.phone}
              onClick={fnCloseModalReferralUserDetail}
            />
          </ModalContainer>
        </Overlay>
      )}

      {referralsIsOpen && usersArray && (
        <Overlay onClick={closeReferral}>
          <ModalContainer>
            <Searcher
              data={usersArray}
              selectInfo={selectInfo}
              searchPlaceholderMsg='Search user...'
            />
          </ModalContainer>
        </Overlay>
      )}
    </>
  )
}

GenealogyPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)

export default GenealogyPage
