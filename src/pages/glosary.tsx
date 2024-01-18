import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import Head from 'next/head'

import { handleFetchError } from 'lib/utils/handleFetchError'
import { getLocalStorage } from 'lib/utils/localStorage'
import { getUserMe } from 'lib/services/user/getUserMe'
import { glosaryData } from 'lib/utils/glosaryData'
import { useAuthStore } from 'lib/stores'
import { APP_INFO } from 'config/appInfo'
import type { Page } from 'lib/types'

import { ListInfoRank } from 'components/page/glsoary/ListInfoRank'
import { ListInfoRole } from 'components/page/glsoary/ListInfoRole'
import { ListInfoApp } from 'components/page/glsoary/ListInfoApp'
import { HeaderCTA } from 'components/page/glsoary/HeaderCTA'
import { InfoRank } from 'components/page/glsoary/InfoRank'
import { InfoRole } from 'components/page/glsoary/InfoRole'
import { InfoApp } from 'components/page/glsoary/InfoApp'
import { builderWebsiteFields } from '../lib/types/user/profile'

const { SEO } = APP_INFO

const GlosaryPage: Page = () => {
  const { auth, setAuth } = useAuthStore()
  const { current: glosaryInfo } = useRef(glosaryData)

  useEffect(() => {
    (async () => {
      if (auth) return

      const token = getLocalStorage('accessToken')

      if (token) {
        const { data, error } = await getUserMe({ token })

        if (error) {
          handleFetchError(error.status, error.info)
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
          isCertified: data.isCertified,
          isValidated: data.isValidated,
          street: data.street,
          city: data.city,
          state: data.state,
          dateOfBirth: data.dateOfBirth,
          zip: data.zip,
          SSNDocURL: data.SSNDocURL,
          doc_irs: data.doc_irs,
          doc_b_structure: data.doc_b_structure,
          ein: data.ein,
          businessName: data.businessName,
          business_type: data.business_type,
          b_start_date: data.b_start_date,
          newSSN: data.newSSN,
          business_approved: data.business_approved,
          ...(builderWebsiteFields.reduce((acc, field) => ({ ...acc, [field]: data[field] }), {}) as any)
        })
      }
    })()
  }, [])

  return (
    <div className='w-full h-full max-w-4xl mx-auto py-10 px-4'>
      <HeaderCTA auth={auth} />

      <div className='mt-20 w-full'>
        <p className='font-bold text-3xl'>Terms of our business</p>

        <div className='mt-10'>
          <span className='text-2xl font-bold'>Apps</span>

          <ListInfoApp>
            { glosaryInfo.apps.map(app => <InfoApp app={app} />) }
          </ListInfoApp>

          <div className='mt-16 md:mt-32'>
            <span className='text-2xl font-bold'>Roles</span>

            <ListInfoRole>
              { glosaryInfo.roles.map(role => <InfoRole role={role} />) }
            </ListInfoRole>
          </div>

          <div className='mt-16 md:mt-32'>
            <span className='text-2xl font-bold'>Ranks</span>

            <ListInfoRank>
              { glosaryInfo.ranks.map(rank => <InfoRank rank={rank} />) }
            </ListInfoRank>
          </div>
        </div>
      </div>
    </div>
  )
}

GlosaryPage.getLayout = (page) => (
  <>
    <Head>
      <title>{SEO.TITLE_PAGE} - Glosary</title>
    </Head>

    {page}
  </>
)

export default GlosaryPage
