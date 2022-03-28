import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import type { IUserBySearch, Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import { Overlay } from 'components/common/Overlay'
import { ModalContainer } from 'components/common/ModalContainer'
import { ReferralListSelectedItemMobile } from 'components/page/referrals/ListSelectedItemMobile'
import { ReferralListSelected } from 'components/page/referrals/ListSelected'
import { ReferralsUserDetailModal } from 'components/page/referrals/UserDetailModal'
import { ReferralTabListItem } from 'components/page/referrals/TabListItem'
import { ReferralTabList } from 'components/page/referrals/TabList'
import { useReferralsData } from 'lib/hooks/useReferralsData'
import { useModal } from 'lib/hooks/useModal'
import { useWindowSize } from 'lib/hooks/useWindowSize'
import { useAuthStore } from 'lib/stores'
import { ReferralListSelectedItem } from 'components/page/referrals/ListSelectedItem'
import { Spinner } from 'components/common/loaders'
import { ILevelUser } from 'lib/types/genealogy'
import { useForm } from 'react-hook-form'
import { getUserBySearch } from 'lib/services/user/getUserBySearch'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { useNearScreen } from 'lib/hooks/useNearScreen'
import { EmptyData } from 'components/common/EmptyData'
import { ReferralCards } from 'components/page/referrals/Cards'
import { CustomerIcon, DriverIcon, MerchantIcon } from 'components/common/icons'
import { ROLES } from 'config/roles'
import { getAllLevels } from 'lib/services/genealogy/getAllLevels'

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

interface IDataFormSearch {
  search: string
}

const GenealogyPage: Page = () => {
  const { handleSubmit, register } = useForm<IDataFormSearch>()
  const { auth } = useAuthStore()
  const { width: windowWidth } = useWindowSize()
  const {
    isOpen: modalReferralListlIsOpen,
    fnOpenModal: fnOpenModalReferralList,
    fnCloseModal: fnCloseModalReferralList
  } = useModal(false)
  const {
    isOpen: modalReferralUserDetailIsOpen,
    fnOpenModal: fnOpenModalReferralUserDetail,
    fnCloseModal: fnCloseModalReferralUserDetail,
    fnCloseModalManually: fnCloseModalManuallyUserDetail
  } = useModal(false)
  const {
    isOpen: modalReferralUserSearchIsOpen,
    fnOpenModal: fnOpenModalReferralSearch,
    fnCloseModal: fnCloseModalReferralSearch
  } = useModal(false)

  const refVisor = useRef(null)
  const isNearScreen = useNearScreen(refVisor.current)

  const [tabOpen, setTabOpen] = useState('1')
  const [userDetailIdOpen, setUserdetailIdOpen] = useState(0)
  // const [levelPage, setLevelPage] = useState(1)
  const [levelPage] = useState(1)
  const [usersSearched, setUsersSearched] = useState<IUserBySearch[] | [] | null>(null)
  const [searchIsLoading, setSearchIsLoading] = useState(false)
  const [userDetailIdSearch, setUserDetailIdSearch] = useState<number | null>(null)

  const {
    levels,
    levelSelected,
    levelSelectedUserData,
    levelSelectedUsers,
    userSearchData,
    fetchLevelIsLoading,
    fetchUserDataLevelIsLoading,
    fetchUserDataSearchIsLoading
  } = useReferralsData(auth, tabOpen, userDetailIdOpen, userDetailIdSearch, levelPage)
  // } = useReferralsData(auth, tabOpen, userDetailIdOpen, page)

  const handleClickTab = (id: string) => setTabOpen(id)

  const onSubmit = async ({ search }: IDataFormSearch) => {
    if (search === '') {
      setUsersSearched(null)
      return
    }

    setSearchIsLoading(true)
    const { data, error } = await getUserBySearch(search, auth.accessToken)

    if (error) {
      handleFetchError(error.status, error.info)
      setSearchIsLoading(false)
      return
    }

    console.log('data:', data)
    setUsersSearched(data)
    setSearchIsLoading(false)
  }

  useEffect(() => {
    // if (isNearScreen) {
    //   setLevelPage(prevState => prevState + 1)
    // }
  }, [isNearScreen])

  if (levels?.length === 0) {
    return (
      <div className='w-full flex flex-col justify-center items-center min-h-[80vh]'>
        <EmptyData label='You have no referrals yet' />

        <div className='w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center justify-items-center gap-4 mt-8'>
          <ReferralCards
            title='Refer Customers'
            ilustration={<CustomerIcon />}
            link={`${auth.referralLink}&role=${ROLES.CUSTOMER}` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />
          <ReferralCards
            title='Driver'
            ilustration={<DriverIcon />}
            link={`${auth.referralLink}&role=${ROLES.DRIVER}` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />
          <ReferralCards
            title='Merchant Customers'
            ilustration={<MerchantIcon />}
            link={`${auth.referralLink}&role=${ROLES.MERCHANT}` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />
        </div>
      </div>
    )
  }

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
      <div className='w-full flex flex-col justify-start'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            id='search'
            name='search'
            type='text'
            className='rounded-md border-2 border-gray-500 px-4 py-2 mr-4 focus:outline-none focus:ring focus:ring-primary-500'
            placeholder='ID / NAME / PHONE / LASTNAME'
            {...register('search')}
          />

          <button
            disabled={searchIsLoading}
            className='bg-primary-500 border-primary-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-primary-500 mt-2 sm:mt-0'
          >
            Search
          </button>
        </form>

        <br />

        <ul className={`${usersSearched && !searchIsLoading ? 'bg-white' : ''} p-4 max-h-[40vh] overflow-auto scroll-primary`}>
          {searchIsLoading && (
            <div className='flex items-center justify-center'>
              <Spinner />
            </div>
          )}
          {usersSearched && !searchIsLoading && (
            usersSearched.length > 0
              ? (
                usersSearched.map(user => (
                  <ReferralListSelectedItem
                    key={user.id}
                    userId={user.id}
                    numUsers={0}
                    userName={user.name}
                    onClick={(id: number) => fnOpenModalReferralSearch(() => setUserDetailIdSearch(id))}
                  />
                ))
              )
              : (
                <p className='text-gray-800 font-semibold'>Not found...</p>
              )
          )}
        </ul>
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
          <div id='visor' ref={refVisor} className='flex items-center justify-center'>
            {fetchLevelIsLoading && <Spinner />}
          </div>
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

      {/* Modal View More Level */}
      {modalReferralUserDetailIsOpen && (
        <Overlay onClick={fnCloseModalReferralUserDetail}>
          <ModalContainer>
            {fetchUserDataLevelIsLoading && (
              <div className='flex items-center justify-center h-[calc(201px-1rem)]'>
                <Spinner />
              </div>
            )}
            {!fetchUserDataLevelIsLoading && levelSelectedUserData && (
              <ReferralsUserDetailModal
                referralUsers={[]}
                id={levelSelectedUserData.id}
                name={levelSelectedUserData.name}
                email={levelSelectedUserData.email}
                phone={levelSelectedUserData.phoneNumber}
                openNewUserInfo={(id: number) => fnOpenModalReferralUserDetail(() => setUserdetailIdOpen(id))}
                levels={levelSelectedUserData.levels}
                auth={auth}
                rank={levelSelectedUserData.ranks?.type}
                sponsor={levelSelectedUserData?.sponsor}
                roles={levelSelectedUserData?.roles}
                closeModalManually={fnCloseModalManuallyUserDetail}
              />
            )}
          </ModalContainer>
        </Overlay>
      )}

      {/* Modal View More Search */}
      {modalReferralUserSearchIsOpen && (
        <Overlay onClick={fnCloseModalReferralSearch}>
          <ModalContainer>
            {fetchUserDataSearchIsLoading && (
              <div className='flex items-center justify-center h-[calc(201px-1rem)]'>
                <Spinner />
              </div>
            )}
            {!fetchUserDataSearchIsLoading && userSearchData && (
              <ReferralsUserDetailModal
                referralUsers={[]}
                id={userSearchData.id}
                name={userSearchData.name}
                email={userSearchData.email}
                phone={userSearchData.phoneNumber}
                openNewUserInfo={(id: number) => fnOpenModalReferralSearch(() => setUserDetailIdSearch(id))}
                levels={userSearchData.levels}
                onClick={fnCloseModalReferralSearch}
                auth={auth}
                rank={userSearchData.ranks?.type}
                sponsor={userSearchData?.sponsor}
                roles={userSearchData?.roles}
                closeModalManually={fnCloseModalManuallyUserDetail}
              />
            )}
          </ModalContainer>
        </Overlay>
      )}
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
