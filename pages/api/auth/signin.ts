import { NextApiRequest, NextApiResponse } from 'next'
import { config } from 'config'

const { HTTP: { STATUS_CODE, METHODS } } = config

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method.includes(METHODS.POST)) {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(config.HTTP.STATUS_CODE.FIELDS_REQUIRED)
        .json({ data: null, error: 'FIELDS_REQUIRED' })
    }

    if (email === 'user@test.com' && password === 'Snap2022*') {
      return res.status(STATUS_CODE.SUCCESSFUL).json({
        data: {
          email: 'user@test.com',
          name: 'Cameron Williamson',
          phone: {
            ext: 'US',
            prefix: '+1',
            number: '444-444-4444'
          },
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJ1c2VyQHRlc3QuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.oN4FjR06Fb7ozXsUt41beZL7owDiZij7srB4Wp0lyrg',
          refreshToken: 'd1s5-1bd5-yt1f-d15w'
        },
        error: null
      })
    } else {
      return res.status(STATUS_CODE.INCORRECT_CREDENTIALS)
        .json({ data: null, error: 'INCORRECT_CREDENTIALS' })
    }
  } else {
    return res.status(STATUS_CODE.METHOD_NOT_ALLOWED)
      .json({ data: null, error: 'Metodo no permitido' })
  }
}
