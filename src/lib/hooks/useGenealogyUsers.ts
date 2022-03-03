import { useEffect, useState } from 'react'
import { getUsers } from 'lib/services/genealogy/users'
import { toast } from 'react-toastify'

export const useGenealogyUsers = (usersPage = 1) => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchedUser, setSearchedUser] = useState(null)

  const resetSearcher = () => {
    setSearchedUser(null)
  }

  const searchById = (userId: string) => {
    const userFound = users.find(user => user.id === userId)
    setSearchedUser(userFound)
  }

  const searchByPhone = (userPhone: string) => {
    const userFound = users.find(user => user.phone === userPhone)
    setSearchedUser(userFound)
  }

  const searchByName = (userName: string) => {
    const userFound = users.find(user => user.name === userName)
    setSearchedUser(userFound)
  }

  useEffect(() => {
    setIsLoading(true)

    getUsers(usersPage)
      .then(({ users }) => setUsers(users))
      .catch((err) => { setError(`useGenealogyUsers error: ${err}`); toast('Error', { type: 'error' }) })
      .finally(() => setIsLoading(false))
  }, [usersPage])

  return {
    users,
    isLoading,
    error,
    searchedUser,
    searchById,
    searchByPhone,
    searchByName,
    resetSearcher
  }
}
