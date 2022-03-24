import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import type { ReactNode } from 'lib/types'
import { useAuthStore } from 'lib/stores'
import { APP_INFO } from 'config/appInfo'
import { ROLES } from 'config/roles'

import DashboardLayout from 'layouts/private/Dashboard'
import { FormBecomeMerchant } from 'components/page/become-role/FormBecomeMerchant'
import { FormBecomeDriver } from 'components/page/become-role/FormBecomeDriver'
import { FormBecomeCustomer } from 'components/page/become-role/FormBecomeCustomer'

const { SEO } = APP_INFO

const BecomeRolePage = ({ role }: { role: 'CUSTOMER' | 'DRIVER' | 'RESTAURANT' }) => { // check the types
  const { auth, setAuth } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    const validateRole = role ? auth.roles[role.toLowerCase()] : null
    validateRole && router.push('/overview')
  }, [])

  if (role.toLocaleUpperCase() === 'CUSTOMER') {
    return (<FormBecomeCustomer userAuth={auth} userSetAuth={setAuth} />)
  }

  if (role.toLocaleUpperCase() === 'DRIVER') {
    return (<FormBecomeDriver userAuth={auth} userSetAuth={setAuth} />)
  }

  return (<FormBecomeMerchant userAuth={auth} userSetAuth={setAuth} />)
}

BecomeRolePage.getLayout = (page: ReactNode) => (
  <>
    <Head>
      <title>{SEO.TITLE_PAGE} - Become Role</title>
    </Head>

    <DashboardLayout>
      {page}
    </DashboardLayout>
  </>
)

export const getServerSideProps: GetServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { role } = query
  const validateRole = role ? ROLES[role.toString().toLocaleUpperCase()] : null

  if (!validateRole) {
    return {
      notFound: true
    }
  }

  return {
    props: { role }
  }
}

export default BecomeRolePage
