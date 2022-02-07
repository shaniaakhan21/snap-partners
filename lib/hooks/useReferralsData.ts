import { IUserData } from 'lib/types'
import { useEffect, useState } from 'react'

interface IDataEmailsTest {
  emailNotifications: {
    level: number
    newUsers: number
    quantity: number
    usersData: {
      users: IUserData[]
    }
  }[]
}

export const useReferralsData = (dataTest: IDataEmailsTest, tabOpen: string, userDetailIdOpen: number) => {
  const [data, setData] = useState({
    emailNotificationsArray: null,
    emailNotificationsUserData: null,
    usersArray: null,
    userDetailOpenData: null
  })

  // INIT DATA
  useEffect(() => {
    const emailNotificationsArray = [...dataTest.emailNotifications]
    const emailNotificationsUserData = { ...emailNotificationsArray.find((emailNotification) => emailNotification.level === parseInt(tabOpen)) }

    const usersArray = []
    emailNotificationsArray.forEach((emailNotification) => {
      emailNotification.usersData.users.forEach((user) => {
        usersArray.push(user)
      })
    })

    setData((prevState) => ({
      ...prevState,
      emailNotificationsArray,
      emailNotificationsUserData,
      usersArray
    }))
  }, [])

  // tabOpen State HandleChange
  useEffect(() => {
    if (!data.emailNotificationsArray) return

    const emailNotificationsUserData = { ...data.emailNotificationsArray.find((emailNotification) => emailNotification.level === parseInt(tabOpen)) }

    setData((prevState) => ({
      ...prevState,
      emailNotificationsUserData
    }))
  }, [tabOpen])

  // userDetailOpen State HandleChange
  useEffect(() => {
    if (!data.emailNotificationsUserData) return

    const userDetailOpenData = data.emailNotificationsUserData.usersData.users.find((user) => user.id === userDetailIdOpen.toString())

    setData((prevState) => ({
      ...prevState,
      userDetailOpenData
    }))
  }, [userDetailIdOpen])

  return data
}
