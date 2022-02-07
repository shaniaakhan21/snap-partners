import { useState } from 'react'

import { useGenealogyUsers } from 'lib/hooks/useGenealogyUsers'

import { Button } from 'components/common/Button'
import { Overlay } from 'components/common/Overlay'
import { ModalContainer } from 'components/common/ModalContainer'
import { ReferralsUserDetailModal } from 'components/page/referrals/UserDetailModal'
import { Searcher } from './Searcher'

export const GenealogyTable = () => {
  const {
    users,
    error,
    isLoading,
    searchById,
    searchByName,
    searchedUser,
    searchByPhone,
    resetSearcher
  } = useGenealogyUsers()
  const [modalShow, setModalShow] = useState(false)
  const [userSelected, setUserSelected] = useState(null)

  const closeModal = (e, element) => {
    if (element === e.target) {
      document.body.style.overflowY = 'auto'
      setModalShow(false)
    }
  }

  const openModal = (user) => {
    setUserSelected(user)
    setModalShow(true)
  }

  const tableHeads = [
    { label: 'User Id' },
    { label: 'Name' },
    { label: 'Phone Number' },
    { label: 'View' }
  ]

  if (error) return <div>Ups, there was a mistake</div>
  if (isLoading) return <div>Loading Users</div>

  return (
    <>
      {
        (modalShow && userSelected) && (
          <Overlay onClick={closeModal}>
            <ModalContainer>
              <ReferralsUserDetailModal
                id={userSelected.id}
                name={userSelected.name}
                email={userSelected.email}
                phone={userSelected.phone}
                onClick={closeModal}
              />
            </ModalContainer>
          </Overlay>
        )
      }

      <div className='bg-white border border-solid border-gray-300 p-4 rounded-md'>
        <div>
          <span className='font-bold text-primary-500 text-3xl'>Genealogy</span>
          <br />

          <Searcher
            searchById={searchById}
            searchByName={searchByName}
            searchedUser={searchedUser}
            resetSearcher={resetSearcher}
            searchByPhone={searchByPhone}
          />

          <div className='overflow-scroll scroll-primary h-[55vh] mt-4 '> {/* the height table should be better */}
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  {
                    tableHeads.map(thead => (
                      <th
                        key={thead.label}
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      >
                        {thead.label}
                      </th>
                    ))
                  }
                </tr>
              </thead>

              <tbody className='bg-white divide-y divide-gray-200 overflow-scroll scroll-primary'>
                {
                  searchedUser
                    ? [{ ...searchedUser }].map((user) => (
                      <tr key={user.id}>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span>{user.id}</span>
                        </td>

                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span className='text-sm text-gray-900'>{user.name}</span>
                        </td>

                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                            {user.phone}
                          </span>
                        </td>

                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          <Button onClick={() => openModal(user)}>View</Button>
                        </td>
                      </tr>
                    ))

                    : users.map((user) => (
                      <tr key={user.id}>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span>{user.id}</span>
                        </td>

                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span className='text-sm text-gray-900'>{user.name}</span>
                        </td>

                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                            {user.phone}
                          </span>
                        </td>

                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          <Button onClick={() => openModal(user)}>View</Button>
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>

          <section className='pt-3'>
            <p className='text-gray-800'>
              <span className='font-bold'>Users:</span> {users.length}
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
