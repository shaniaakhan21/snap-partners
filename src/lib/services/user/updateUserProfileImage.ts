import { IQueryErrorReturn } from 'lib/types/http/query'

interface IUpdateUserProfileImageBody {
  image: File
}

export const updateUserProfileImage = async (token: string, dataBody: IUpdateUserProfileImageBody): Promise<IQueryErrorReturn> => {
  const formData = new FormData()
  const entries = Object.entries(dataBody)

  entries.forEach(([key, value]) => {
    formData.append(key, value)
  })

  const res = await fetch('/api/user/profileImage', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  })

  const data = await res.json()

  if (!res.ok) {
    return {
      error: {
        status: res.status,
        info: data.error
      }
    }
  }

  return { error: null }
}