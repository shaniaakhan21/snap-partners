import { IQueryErrorReturn } from 'lib/types/http/query'

interface IUpdateUserProfileImageBody {
  image: File
}

export const updateUserProfileImage = async (token: string, dataBody: IUpdateUserProfileImageBody): Promise<IQueryErrorReturn> => {
  const formData = new FormData()
  formData.append('image', dataBody.image)
      for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }
  const res = await fetch('/api/user/profileImage', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  })

  const data = await res.json()

  if (!res.ok) {
    return {
      error: {
        info: data.error,
        status: res.status
      }
    }
  }

  return { error: null }
}