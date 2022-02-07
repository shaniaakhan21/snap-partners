import { API } from 'config'

const normalizeUser = (user) => {
  return {
    ...user,
    id: Math.random().toString(36).slice(2),
    name: user.first_name,
    phone: '+1 (444)-4444'
  }
}

export const getUsers = async (usersPage = 1) => {
  const res = await fetch(`${API.BASE_URL}/users?page${usersPage}`)
  // eslint-disable-next-line camelcase
  const { page, per_page, total, total_pages, data } = await res.json()
  const users = data.map(user => normalizeUser(user))

  return {
    page,
    perPage: per_page,
    total,
    totalPages: total_pages,
    users
  }
}

export const getUserById = async (userId = 1) => {
  const res = await fetch(`${API.BASE_URL}/users/${userId}`)
  // eslint-disable-next-line camelcase
  const { avatar, email, first_name, id, last_name } = await res.json()

  return {
    id,
    firstName: first_name,
    lastName: last_name,
    email,
    avatar
  }
}
