export const fakeVerifyCode = async (code: string) => {
  await new Promise((resolve, reject) => {
    if (code === '123456') {
      setTimeout(resolve, 2000)
    } else {
      setTimeout(() => reject(new Error('INCONRRECT_CODE')), 2000)
    }
  })
}
