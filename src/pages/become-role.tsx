import Head from 'next/head'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
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
import { Spinner } from 'components/common/loaders'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

const { SEO } = APP_INFO

const BecomeRolePage = ({ role }: { role: 'CUSTOMER' | 'DRIVER' | 'RESTAURANT' }) => { // check the types
  const { auth, setAuth } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    const validateRole = role ? auth.roles[role.toLowerCase()] : null

    validateRole && toast(`You are already a ${role.toLowerCase()}`, { type: 'warning' })
    validateRole && router.push('/overview')
  }, [])

  useEffect(() => {
    const validateRole = role ? auth.roles[role.toLowerCase()] : null

    validateRole && toast(`You are now a ${role.toLowerCase()}!`, { type: 'success' })
    validateRole && router.push('/overview')
  }, [auth])

  if (role.toLocaleUpperCase() === 'CUSTOMER' && !auth.roles.customer) {
    return (<FormBecomeCustomer userAuth={auth} userSetAuth={setAuth} />)
  }

  if (role.toLocaleUpperCase() === 'DRIVER' && (!auth.roles.merchant && !auth.roles.driver)) {
    return (<FormBecomeDriver userAuth={auth} userSetAuth={setAuth} />)
  }

  if (role.toLocaleUpperCase() === 'MERCHANT' && !auth.roles.merchant) {
    return (<FormBecomeMerchant userAuth={auth} userSetAuth={setAuth} />)
  }

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <Spinner classes='w-20' />
    </div>
  )
}

BecomeRolePage.getLayout = (page: ReactNode) => {
  const { t } = useTranslation()

  return (
    <DashboardLayout>
      <Head>
        <title>{SEO.TITLE_PAGE} - Become Role</title>
      </Head>

      {page}
    </DashboardLayout>
  )
}

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

export async function getStaticProps ({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [...APP_INFO.COMMON_NS_LIST]))
    }
  }
}

export default BecomeRolePage
