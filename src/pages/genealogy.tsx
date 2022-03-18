// import { Fragment, useEffect, useRef, useState } from 'react'
import { useState } from 'react'
import Head from 'next/head'
import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import { Overlay } from 'components/common/Overlay'
import { ModalContainer } from 'components/common/ModalContainer'
// import { Searcher } from 'components/common/Search'
import { ReferralListSelectedItemMobile } from 'components/page/referrals/ListSelectedItemMobile'
import { ReferralListSelected } from 'components/page/referrals/ListSelected'
import { ReferralsUserDetailModal } from 'components/page/referrals/UserDetailModal'
import { ReferralTabListItem } from 'components/page/referrals/TabListItem'
import { ReferralTabList } from 'components/page/referrals/TabList'
import { useReferralsData } from 'lib/hooks/useReferralsData'
import { useModal } from 'lib/hooks/useModal'
import { useWindowSize } from 'lib/hooks/useWindowSize'
// import { useAuthStore, useSearchModalStore } from 'lib/stores'
import { useAuthStore } from 'lib/stores'
import { ReferralListSelectedItem } from 'components/page/referrals/ListSelectedItem'
import { Spinner } from 'components/common/loaders'
import { ILevelUser } from 'lib/types/genealogy'
import { useForm } from 'react-hook-form'
// import { useNearScreen } from 'lib/hooks/useNearScreen'

const { SEO } = APP_INFO

// const selectInfo = {
//   selectDefaultValue: 'name',
//   selectOptions: [
//     {
//       value: 'id',
//       text: 'ID'
//     },
//     {
//       value: 'name',
//       text: 'Fullname'
//     },
//     {
//       value: 'email',
//       text: 'Email'
//     },
//     {
//       value: 'phone',
//       text: 'Phone'
//     }
//   ]
// }

const GenealogyPage: Page = () => {
  const {} = useForm()
  const { auth } = useAuthStore()
  // const { genealogySearchIsOpen, closeGenealogySearch } = useSearchModalStore()
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

  // const refVisor = useRef(null)
  // const isNearScreen = useNearScreen(refVisor.current)

  const [tabOpen, setTabOpen] = useState('1')
  const [userDetailIdOpen, setUserdetailIdOpen] = useState(0)
  // const [page, setPage] = useState(1)

  const {
    levels,
    levelSelected,
    levelSelectedUserData,
    levelSelectedUsers
    // fetchingUserData
  } = useReferralsData(auth, tabOpen, userDetailIdOpen)
  // } = useReferralsData(auth, tabOpen, userDetailIdOpen, page)

  // console.log('LEVELS:', levels)
  // console.log('LEVELS SELECTED:', levelSelected)
  // console.log('LEVEL SELECTED USER DATA:', levelSelectedUserData)
  // console.log('LEVEL SELECTED USERS:', levelSelectedUsers)
  // console.log('----------------------------------')

  const handleClickTab = (id: string) => setTabOpen(id)

  const handleSubmit = () => {}

  // useEffect(() => {
  //   console.log('NEAR SCREEN', isNearScreen)
  //   if (isNearScreen) {
  //     // setPage(prevState => prevState + 1)
  //     setPage(page + 1)
  //   }
  // }, [isNearScreen])

  if (levels?.length === 0) return <h1 className='text-center text-5xl'>Empty</h1>

  if (
    !levels ||
    !levelSelected ||
    !levelSelectedUsers
  ) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input />
          <button>Search</button>
        </form>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 justify-center justify-items-center gap-4 mt-4'>
        <ReferralTabList classes='col-span-1'>
          {levels.map((level) => (
            <ReferralTabListItem
              key={level.level}
              isSelect={level.level === parseInt(tabOpen)}
              id={level.level.toString()}
              newUsers={0}
              numUsers={level.usersLength}
              onClick={windowWidth >= 1024 ? handleClickTab : (id) => fnOpenModalReferralList(() => handleClickTab(id))}
            />
          ))}
          {/* <div id='visor' ref={refVisor} /> */}
        </ReferralTabList>

        {/* List in desktop */}
        {windowWidth >= 1024 && (
          <ReferralListSelected
            id={levelSelected.level.toString()}
            newUsers={0}
            numUsers={levelSelected.usersLength}
            classes='col-span-2'
          >
            {levelSelected.users.map((user: ILevelUser) => (
              <ReferralListSelectedItem
                key={user.id}
                userId={user.id}
                numUsers={0}
                userName={user.name}
                onClick={(id: number) => fnOpenModalReferralUserDetail(() => setUserdetailIdOpen(id))}
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
              id={levelSelected.level.toString()}
              newUsers={0}
              numUsers={levelSelected.usersLength}
            >
              {levelSelected.users.map((user: ILevelUser) => (
                <ReferralListSelectedItemMobile
                  key={user.id}
                  userId={user.id}
                  numUsers={levelSelected.usersLength}
                  userName={user.name}
                  onClick={(id: number) => fnOpenModalReferralUserDetail(() => setUserdetailIdOpen(id))}
                />
              ))}
            </ReferralListSelected>
          </ModalContainer>
        </Overlay>
      )}

      {/* Modal View More */}
      {modalReferralUserDetailIsOpen && levelSelectedUserData && (
        <Overlay onClick={fnCloseModalReferralUserDetail}>
          <ModalContainer>
            <ReferralsUserDetailModal
              referralUsers={[]}
              id={levelSelectedUserData.id.toString()}
              name={levelSelectedUserData.name}
              email={levelSelectedUserData.email}
              phone={levelSelectedUserData.phoneNumber}
              onClick={fnCloseModalReferralUserDetail}
              authIsAdmin={true}
              rank={levelSelectedUserData.ranks?.type}
              sponsor={levelSelectedUserData?.sponsor}
              roles={{ admin: false, customer: true, driver: false, merchant: false }}
            />
            {/* <ReferralsUserDetailModal
              referralUsers={[]}
              id={levelSelectedUserData.id.toString()}
              name={levelSelectedUserData.name}
              email={levelSelectedUserData.email}
              phone={levelSelectedUserData.phoneNumber}
              onClick={fnCloseModalReferralUserDetail}
              authIsAdmin={auth.roles.admin}
              rank={levelSelectedUserData.ranks.type}
              sponsor={levelSelectedUserData.sponsor}
              roles={levelSelectedUserData.roles}
            /> */}
          </ModalContainer>
        </Overlay>
      )}

      {/* {genealogySearchIsOpen && levelSelectedUsers && (
        <Overlay onClick={closeGenealogySearch}>
          <ModalContainer>
            <Searcher
              data={levelSelectedUsers}
              selectInfo={selectInfo}
              searchPlaceholderMsg='Search user...'
            />
          </ModalContainer>
        </Overlay>
      )} */}
    </>
  )
}

GenealogyPage.getLayout = (page: ReactNode) => (
  <>
    <Head>
      <title>{SEO.TITLE_PAGE} - Genealogy</title>
    </Head>

    <DashboardLayout>
      {page}
    </DashboardLayout>
  </>
)

export default GenealogyPage
