export const fakeLogin = async () => {
  const res = {
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
  }

  return res
}
