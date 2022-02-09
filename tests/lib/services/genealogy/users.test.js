/* eslint-disable no-undef */
import { getUsers } from 'lib/services/genealogy/users'

describe('Test Genealogy Users Service', () => {
  it('Should return users tests', async () => {
    const { users } = await getUsers() // this not running in client side because fetch is not defined ._.
    console.log(users)
  })
})
