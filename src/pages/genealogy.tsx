import { useForm } from 'react-hook-form'
import { useRef, useState } from 'react'
import Head from 'next/head'

import { getUserBySearch } from 'lib/services/user/getUserBySearch'
import type { IUserBySearch, Page, ReactNode } from 'lib/types'
import { useAuthStore, useLayoutConfig } from 'lib/stores'
import { useReferralsData } from 'lib/hooks/useReferralsData'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { useWindowSize } from 'lib/hooks/useWindowSize'
import { useModal } from 'lib/hooks/useModal'
import { APP_INFO } from 'config/appInfo'
import { ROLES } from 'config/roles'

import DashboardLayout from 'layouts/private/Dashboard'
import { Unilevel as OldGenealogy } from '../components/page/genealogy/OldGenealogy/UniLevel'
import { CustomerIcon, DriverIcon, MerchantIcon } from 'components/common/icons'
import { SpinnerPageContent } from 'components/common/loaders/PageContent'
import { NewGenealogy } from 'components/page/genealogy/NewGenealogy'
import { ReferralCards } from 'components/page/referrals/Cards'
import { EmptyData } from 'components/common/empty/EmptyData'

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
  const { genealogy: genealogyLayoutConfig } = useLayoutConfig()
  const store = useAuthStore()
  const auth: any = store.auth
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

    setUsersSearched(data)
    setSearchIsLoading(false)
  }

  const isIntegrous = (auth.roles.integrousAssociate || auth.roles.integrousCustomer)

  if (isIntegrous) {
    if (levels?.length === 0) {
      return (
        <div className='w-full flex flex-col justify-center items-center min-h-[80vh]'>
           <EmptyData label='You have no referrals yet' />
        </div>
      )
    }
  }

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
    return <SpinnerPageContent />
  }

  return (
    <>
      {
        !genealogyLayoutConfig.isNewGenealogy
          ? <OldGenealogy />
          : <NewGenealogy
            auth={auth}
            fetchLevelIsLoading={fetchLevelIsLoading}
            fetchUserDataLevelIsLoading={fetchUserDataLevelIsLoading}
            fetchUserDataSearchIsLoading={fetchUserDataSearchIsLoading}
            fnCloseModalManuallyUserDetail={fnCloseModalManuallyUserDetail}
            fnCloseModalReferralList={fnCloseModalReferralList}
            fnCloseModalReferralSearch={fnCloseModalReferralSearch}
            fnCloseModalReferralUserDetail={fnCloseModalReferralUserDetail}
            fnOpenModalReferralList={fnOpenModalReferralList}
            fnOpenModalReferralSearch={fnOpenModalReferralSearch}
            fnOpenModalReferralUserDetail={fnOpenModalReferralUserDetail}
            handleClickTab={handleClickTab}
            handleSubmit={handleSubmit}
            levelSelected={levelSelected}
            levelSelectedUserData={levelSelectedUserData}
            levels={levels}
            modalReferralListlIsOpen={modalReferralListlIsOpen}
            modalReferralUserDetailIsOpen={modalReferralUserDetailIsOpen}
            modalReferralUserSearchIsOpen={modalReferralUserSearchIsOpen}
            onSubmit={onSubmit}
            refVisor={refVisor}
            register={register}
            searchIsLoading={searchIsLoading}
            setUserDetailIdSearch={setUserDetailIdSearch}
            setUserdetailIdOpen={setUserdetailIdOpen}
            tabOpen={tabOpen}
            userSearchData={userSearchData}
            usersSearched={usersSearched}
            windowWidth={windowWidth}
          />
      }
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
