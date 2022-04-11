import { Overlay } from 'components/common/Overlay'
import { ModalContainer } from 'components/common/ModalContainer'
import { ReferralListSelectedItemMobile } from 'components/page/referrals/ListSelectedItemMobile'
import { ReferralListSelected } from 'components/page/referrals/ListSelected'
import { ReferralsUserDetailModal } from 'components/page/referrals/UserDetailModal'
import { ReferralTabListItem } from 'components/page/referrals/TabListItem'
import { ReferralTabList } from 'components/page/referrals/TabList'
import { ReferralListSelectedItem } from 'components/page/referrals/ListSelectedItem'
import { Spinner } from 'components/common/loaders'
import { ILevelUser } from 'lib/types/genealogy'
import { useLayoutConfig } from 'lib/stores'

export const NewGenealogy = ({
  handleSubmit,
  onSubmit,
  register,
  searchIsLoading,
  usersSearched,
  fnOpenModalReferralSearch,
  fnOpenModalReferralUserDetail,
  modalReferralUserDetailIsOpen,
  fnCloseModalReferralUserDetail,
  fnCloseModalReferralList,
  fetchUserDataLevelIsLoading,
  levelSelectedUserData,
  auth,
  fetchUserDataSearchIsLoading,
  modalReferralUserSearchIsOpen,
  fnCloseModalReferralSearch,
  setUserdetailIdOpen,
  fnCloseModalManuallyUserDetail,
  userSearchData,
  modalReferralListlIsOpen,
  fnOpenModalReferralList,
  setUserDetailIdSearch,
  fetchLevelIsLoading,
  handleClickTab,
  levelSelected,
  windowWidth,
  refVisor,
  levels,
  tabOpen
}) => {
  const { genealogy: genealogyLayoutConfig } = useLayoutConfig()

  return (
    <>
      <div className='w-full flex flex-col justify-start'>
        <div className='w-full flex items-center justify-between'>
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
              className={`${searchIsLoading ? 'bg-gray-600 border-gray-600' : 'bg-primary-500 border-primary-500'} text-white font-semibold rounded-md px-4 py-2 hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-primary-500 mt-2 sm:mt-0`}
            >
            Search
            </button>
          </form>

          <div>
            <label htmlFor='toggle-example-checked' className='flex items-center cursor-pointer relative mt-4 sm:mt-0 hover:text-primary-500'>
              <input
                type='checkbox'
                id='toggle-example-checked'
                className='sr-only'
                checked={genealogyLayoutConfig.isNewGenealogy}
                onChange={() => genealogyLayoutConfig.toggleTypeGenealogy()}
              />
              <div className='toggle-bg bg-gray-400 border-2 border-gray-200 h-6 w-11 rounded-full'></div>
              <span className='ml-3 text-sm font-medium'>
                {
                  genealogyLayoutConfig.isNewGenealogy
                    ? 'New Genealogy Layout'
                    : 'Legacy Genealogy Layout'
                }
              </span>
            </label>
          </div>
        </div>

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
