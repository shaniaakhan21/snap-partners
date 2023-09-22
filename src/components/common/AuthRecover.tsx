import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useAuthStore } from 'lib/stores'
import { getLocalStorage } from 'lib/utils/localStorage'
import { getUserMe } from 'lib/services/user/getUserMe'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { GTMTrack } from 'lib/utils/gtm'
import { builderWebsiteFields } from '../../lib/types/user/profile'

interface AuthRecoverProps {
  skipRedirect?: boolean;
  redirectTo?: string;
}

export const AuthRecover = ({ skipRedirect, redirectTo }: AuthRecoverProps) => {
  const router = useRouter()
  const { auth, setAuth } = useAuthStore()

  useEffect(() => {
    (async () => {
      if (auth) return

      const token = getLocalStorage('accessToken')

      if (!token) {
        if (skipRedirect) return
        router.push('/auth/login')
        return
      }

      // const { userId } = decodeAccessToken(token)

      const { data, error } = await getUserMe({ token })

      if (error) {
        handleFetchError(error.status, error.info)
        router.push('/auth/login')
        return
      }

      toast('Session recovered!', { type: 'success' })
      setAuth({
        socialSecurityNumber: data.socialSecurityNumber,
        email: data.email,
        name: data.name,
        password: data.password,
        phoneNumber: data.phoneNumber,
        accessToken: token,
        lastname: data.lastname,
        roles: data.roles,
        id: data.id,
        username: data.username,
        referralCode: data.referralCode,
        driver_status: data.driver_status,
        idImage: data.idImage,
        insuranceImage: data.insuranceImage,
        profileImage: data.profileImage,
        isManager: data.ranks?.type === 'manager',
        createdAt: data.createdAt,
        ownerName: data.ownerName,
        ranks: data.ranks,
        updatedAt: data.updatedAt,
        blocked: data.blocked,
        deleted: data.deleted,
        nsurAccount: {
          nsurUserId: data.nsurUserId,
          myPoints: auth?.nsurAccount?.myPoints || null
        },
        bank_information: data.bank_information,
        level: data.level,
        ...(builderWebsiteFields.reduce((acc, field) => ({ ...acc, [field]: data[field] }), {}) as any)
      })
    })()

    // add user info into GTM dataLayer
    if (auth) {
      const {
        id,
        username,
        name,
        lastname,
        email,
        phoneNumber,
        roles,
        isManager,
        accessToken,
        createdAt,
        idImage,
        insuranceImage,
        ownerName,
        driver_status,
        ranks,
        referralCode,
        updatedAt,
        blocked,
        deleted,
        nsurAccount,
        referralLink
      } = auth

      GTMTrack.userInfo({
        id,
        username,
        name,
        lastname,
        email,
        phoneNumber,
        roles,
        isManager,
        createdAt,
        driver_status,
        accessToken,
        idImage,
        insuranceImage,
        ownerName,
        ranks,
        referralCode,
        updatedAt,
        referralLink,
        blocked,
        deleted,
        nsurAccount
      })

      if (redirectTo) {
        router.push(redirectTo)
      }
    } else {
      GTMTrack.userInfo()
    }
  }, [auth])

  return (<></>
  )
}
