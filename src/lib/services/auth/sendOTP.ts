import { IQueryErrorReturn } from 'lib/types/http/query'

interface ISendOTPDataBody {
  phoneNumber: string
}

export const sendOTP = async (dataBody: ISendOTPDataBody): Promise<IQueryErrorReturn> => {
  const res = await fetch('/api/authentication/sendOTP', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phoneNumber: dataBody.phoneNumber
    })
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
