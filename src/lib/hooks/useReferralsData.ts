import { useEffect, useState } from 'react'
// import { toast } from 'react-toastify'
import { IAuth } from 'lib/stores/Auth'
import { getAllLevels } from 'lib/services/genealogy/getAllLevels'
import { ILevel, ILevelUser } from 'lib/types/genealogy'
import { getUserById } from 'lib/services/user/getUserById'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { IUserById } from 'lib/types'

interface IUserByIdWithLevels extends IUserById {
  levels: ILevel[]
}

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
  levelPage: number,
  id?:string | string[]
) => {
  const [levels, setLevels] = useState<ILevel[] | null>(null)
  const [levelSelected, setLevelSelected] = useState<ILevel | null>(null)
  const [levelSelectedUsers, setLevelSelectedUsers] = useState<ILevelUser[] | null>(null)
  const [levelSelectedUserData, setLevelSelectedUserData] = useState<IUserByIdWithLevels | null>(null)
  const [userSearchData, setUserSearchData] = useState<IUserByIdWithLevels | null>(null)

  // Loaders
  // const [fetchLevelIsLoading, setFetchLevelIsLoading] = useState(false)
  const [fetchLevelIsLoading] = useState(false)
  const [fetchUserDataLevelIsLoading, setFetchUserDataLevelIsLoading] = useState(false)
  const [fetchUserDataSearchIsLoading, setFetchUserDataSearchIsLoading] = useState(false)
  if (typeof id === 'string') {
    var userId = parseInt(id)
  }

  // Init Data and Level Page Changed
  useEffect(() => {
    (async () => {
      // setFetchLevelIsLoading(true)
      const { data, error } = await fnGetAllLevels(
        userId || userAuth.id,
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
          // ? { ...newLevels.find(({ level }) => level === parseInt(tabOpen)) } // this will be used in pagination
          ? { ...newLevels[0] }
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
      setFetchUserDataLevelIsLoading(true)
      const { data: dataUserInfo, error: errorUserInfo } = await fnGetUserById(userDetailIdOpen, userAuth.accessToken)

      if (errorUserInfo) {
        setFetchUserDataLevelIsLoading(false)
        return
      }

      const { data: dataUserLevels, error: errorUserLevels } = await fnGetAllLevels(userDetailIdOpen, userAuth.accessToken, levelPage)
      setFetchUserDataLevelIsLoading(false)
      if (errorUserLevels) return

      setLevelSelectedUserData({
        ...dataUserInfo,
        levels: dataUserLevels.levels
      })
    })()
  }, [userDetailIdOpen])

  useEffect(() => {
    if (!userDetailIdSearch) return

    (async () => {
      setFetchUserDataSearchIsLoading(true)
      const { data: dataUserInfo, error: errorUserInfo } = await fnGetUserById(userDetailIdSearch, userAuth.accessToken)

      if (errorUserInfo) {
        setFetchUserDataSearchIsLoading(false)
        return
      }

      const { data: dataUserLevels, error: errorUserLevels } = await fnGetAllLevels(userDetailIdSearch, userAuth.accessToken, levelPage)
      setFetchUserDataSearchIsLoading(false)
      if (errorUserLevels) return

      setUserSearchData({
        ...dataUserInfo,
        levels: dataUserLevels.levels
      })
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
