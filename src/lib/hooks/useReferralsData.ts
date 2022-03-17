import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { IAuth } from 'lib/stores/Auth'
import { getAllLevels } from 'lib/services/genealogy/getAllLevels'
import { ILevel, ILevelUser } from 'lib/types/genealogy'
import { getUserById } from 'lib/services/user/getUserById'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { IUserById } from 'lib/types'

// const fnGetAllLevels = async (id: number, token: string, page: number) => {
//   const { data, error } = await getAllLevels(id, token, page)

//   if (error) handleFetchError(error.status, error.info)

//   return { data, error }
// }

const fnGetAllLevels = async (id: number, token: string) => {
  const { data, error } = await getAllLevels(id, token)

  if (error) handleFetchError(error.status, error.info)

  return { data, error }
}

// export const useReferralsData = (userAuth: IAuth, tabOpen: string, userDetailIdOpen: number, page: number) => {
export const useReferralsData = (userAuth: IAuth, tabOpen: string, userDetailIdOpen: number) => {
  const [levels, setLevels] = useState<ILevel[] | null>(null)
  const [levelSelected, setLevelSelected] = useState<ILevel | null>(null)
  const [levelSelectedUsers, setLevelSelectedUsers] = useState<ILevelUser[] | null>(null)
  const [levelSelectedUserData, setLevelSelectedUserData] = useState<IUserById | null>(null)

  // INIT DATA
  useEffect(() => {
    (async () => {
      // const { data, error } = await fnGetAllLevels(
      //   userAuth.id,
      //   userAuth.accessToken,
      //   page
      // )
      const { data, error } = await fnGetAllLevels(
        userAuth.id,
        userAuth.accessToken
      )

      if (error) return

      const levels = [...data.levels]
      const levelSelected = levels.length > 0
        ? { ...levels.find(({ level }) => level === parseInt(tabOpen)) }
        : null
      const levelSelectedUsers = levelSelected ? [...levelSelected.users] : null

      setLevels(levels)
      setLevelSelected(levelSelected)
      setLevelSelectedUsers(levelSelectedUsers)
    })()
  }, [])

  // Page Changed
  // useEffect(() => {
  //   console.log('PAGE:', page)
  //   if (page === 1) return // No init data

  //   (async () => {
  //     const { data, error } = await fnGetAllLevels(
  //       userAuth.id,
  //       userAuth.accessToken,
  //       page
  //     )

  //     if (error) return

  //     const newLevels = levels ? [...levels, ...data.levels] : [...data.levels]
  //     setLevels(newLevels)
  //   })()
  // }, [page])

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

      // const { data, error } = await getAllLevels(
      //   userAuth.accessToken,
      //   { userId: levelSelectedUserData.id, username: levelSelectedUserData.name }
      // )

      const { data, error } = await getUserById(levelSelectedUserData.id, userAuth.accessToken)

      console.log('data:', data)

      if (error) {
        handleFetchError(error.status, error.info)
        return
      }

      setLevelSelectedUserData(data)
    })()
  }, [userDetailIdOpen])

  return {
    levels,
    levelSelected,
    levelSelectedUsers,
    levelSelectedUserData
  }
}
