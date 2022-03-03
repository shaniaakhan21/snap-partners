import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Spinner } from 'components/common/loaders'
import type { Page as PageNext } from 'lib/types'
import { useAuthStore } from 'lib/stores'
import { PAGE_INFO } from 'config/pageInfo'
import { getLocalStorage } from 'lib/utils/localStorage'
import { decodeAccessToken } from 'lib/utils/decodedAccessToken'
import { toast } from 'react-toastify'
import { getUserMe } from 'lib/services/users/getUserMe'
import { handleFetchError } from 'lib/utils/handleFetchError'

const { SEO } = PAGE_INFO

const HomePage: PageNext = () => {
  const { auth, setAuth } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    (async () => {
      if (auth) {
        router.push('/overview')
        return
      }

      const token = getLocalStorage('accessToken')

      if (!token) {
        router.push('/auth/login')
        return
      }

      const { userId } = decodeAccessToken(token)

      const { data, error } = await getUserMe({ token })

      if (error) {
        handleFetchError(error.status, error.info)
        router.push('/auth/login')
        return
      }

      toast('Session recovered!', { type: 'success' })
      setAuth({
        email: data.email,
        name: data.email,
        phone: data.phoneNumber,
        accessToken: token,
        lastname: data.lastname,
        roles: data.roles,
        id: userId,
        username: data.username,
        referralCode: data.referralCode,
        idImage: data.idImage,
        insuranceImage: data.insuranceImage,
        isManager: data.isManager,
        sponsorId: data.sponsorId
      })
      router.push('/overview')
    })()
  }, [auth])

  if (!auth) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <Spinner classes='w-20 h-20' />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE}</title>
      </Head>

      <div className='w-screen h-screen flex justify-center items-center'>
        <div className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-center font-black text-primary-500 px-4'>Snap Delivered</div>
      </div>
    </>
  )
}

export default HomePage
