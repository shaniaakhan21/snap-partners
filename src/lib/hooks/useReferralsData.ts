import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { IAuth } from 'lib/stores/Auth'
import { getAllLevels } from 'lib/services/genealogy/getAllLevels'
import { ILevel, ILevelUser } from 'lib/types/genealogy'
import { getUserById } from 'lib/services/user/getUserById'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { IUserById } from 'lib/types'

const fnGetAllLevels = async (id: number, token: string, page: number) => {
  const { data, error } = await getAllLevels(id, token, page)

  if (error) handleFetchError(error.status, error.info)

  return { data, error }
}

const fnGetUserById = async (id: number, token: string) => {
  const { data, error } = await getUserById(id, token)

  if (error) handleFetchError(error.status, error.info)

  return { data, error }
}

// export const useReferralsData = (userAuth: IAuth, tabOpen: string, userDetailIdOpen: number, page: number) => {
export const useReferralsData = (
  userAuth: IAuth,
  tabOpen: string,
  userDetailIdOpen: number,
  userDetailIdSearch,
  levelPage: number
) => {
  const [levels, setLevels] = useState<ILevel[] | null>(null)
  const [levelSelected, setLevelSelected] = useState<ILevel | null>(null)
  const [levelSelectedUsers, setLevelSelectedUsers] = useState<ILevelUser[] | null>(null)
  const [levelSelectedUserData, setLevelSelectedUserData] = useState<IUserById | null>(null)
  const [userSearchData, setUserSearchData] = useState<IUserById | null>(null)

  // Loaders
  // const [fetchLevelIsLoading, setFetchLevelIsLoading] = useState(false)
  const [fetchLevelIsLoading] = useState(false)
  const [fetchUserDataLevelIsLoading, setFetchUserDataLevelIsLoading] = useState(false)
  const [fetchUserDataSearchIsLoading, setFetchUserDataSearchIsLoading] = useState(false)

  // Init Data and Level Page Changed
  useEffect(() => {
    (async () => {
      // setFetchLevelIsLoading(true)
      const { data, error } = await fnGetAllLevels(
        userAuth.id,
        userAuth.accessToken,
        levelPage
      )
      // setFetchLevelIsLoading(false)
      if (error) return

      const newLevels = levels ? [...levels, ...data.levels] : [...data.levels]
      setLevels(newLevels)

      // ONLY TO INIT DATA
      if (levelPage === 1) {
        const levelSelected = newLevels?.length > 0
          ? { ...newLevels.find(({ level }) => level === parseInt(tabOpen)) }
          : null
        const levelSelectedUsers = levelSelected ? [...levelSelected.users] : null

        setLevelSelected(levelSelected)
        setLevelSelectedUsers(levelSelectedUsers)
      }
    })()
  }, [levelPage])

  // tabOpen State HandleChange
  useEffect(() => {
    if (!levels) return

    const levelSelected = { ...levels.find(({ level }) => level === parseInt(tabOpen)) }

    setLevelSelected(levelSelected)
  }, [tabOpen])

  // userDetailOpen State HandleChange
  useEffect(() => {
    if (!levelSelected) return

    (async () => {
      const levelSelectedUserData = levelSelected.users.find((user: ILevelUser) => user.id === userDetailIdOpen) ?? null

      if (!levelSelectedUserData) {
        toast('This user does not exist.', { type: 'error' })
        return
      }

      setFetchUserDataLevelIsLoading(true)
      const { data, error } = await fnGetUserById(userDetailIdOpen, userAuth.accessToken)
      setFetchUserDataLevelIsLoading(false)
      if (error) return

      setLevelSelectedUserData(data)
    })()
  }, [userDetailIdOpen])

  useEffect(() => {
    if (!userDetailIdSearch) return

    (async () => {
      console.log(fetchUserDataSearchIsLoading)
      setFetchUserDataSearchIsLoading(true)
      const { data, error } = await fnGetUserById(userDetailIdSearch, userAuth.accessToken)
      setFetchUserDataSearchIsLoading(false)
      if (error) return

      setUserSearchData(data)
    })()
  }, [userDetailIdSearch])

  return {
    levels,
    levelSelected,
    levelSelectedUsers,
    levelSelectedUserData,
    userSearchData,
    fetchLevelIsLoading,
    fetchUserDataLevelIsLoading,
    fetchUserDataSearchIsLoading
  }
}
