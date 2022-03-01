import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { IAuth } from 'lib/stores/Auth'
import { getAllLevels } from 'lib/services/genealogy/getAllLevels'
import { ILevel, ILevelUser, IUserSelectedLevels } from 'lib/types/genealogy'

export const useReferralsData = (userAuth: IAuth, tabOpen: string, userDetailIdOpen: number) => {
  const [levels, setLevels] = useState<ILevel[] | null>(null)
  const [levelSelected, setLevelSelected] = useState<ILevel | null>(null)
  const [levelSelectedUsers, setLevelSelectedUsers] = useState<ILevelUser[] | null>(null)
  const [levelSelectedUserData, setLevelSelectedUserData] = useState<IUserSelectedLevels | null>(null)

  // INIT DATA
  useEffect(() => {
    (async () => {
      const { data, error } = await getAllLevels(
        userAuth.accessToken,
        { userId: userAuth.id, username: userAuth.username }
      )

      if (error) {
        toast('ERROR -> trying to fetch the levels', { type: 'error' })
        return
      }

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

      const { data, error } = await getAllLevels(
        userAuth.accessToken,
        { userId: levelSelectedUserData.id, username: levelSelectedUserData.name }
      )

      console.log('data:', data)

      if (error) {
        toast('ERROR -> trying to fetch the levels.', { type: 'error' })
        return
      }

      setLevelSelectedUserData({ ...levelSelectedUserData, levels: data.levels })
    })()
  }, [userDetailIdOpen])

  return {
    levels,
    levelSelected,
    levelSelectedUsers,
    levelSelectedUserData
  }
}
