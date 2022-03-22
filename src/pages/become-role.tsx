import Head from 'next/head'

import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import type { ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import { ROLES } from 'config/roles'

import DashboardLayout from 'layouts/private/Dashboard'
// import { useEffect } from 'react'
// import { useAuthStore } from 'lib/stores'
// import { handleFetchError } from 'lib/utils/handleFetchError'
// import { toast } from 'react-toastify'
// import { useRouter } from 'next/router'
// import { updateUserRole } from 'lib/services/user/updateUserRole'

const { SEO } = APP_INFO

const BecomeRolePage = ({ role }: { role: string }) => {
  //   const router = useRouter()
  // const { auth, setAuth } = useAuthStore()

  // useEffect(() => {
  //   const validateRole = role ? auth.roles[role.toLowerCase()] : null

  //   validateRole && router.push('/overview')
  // }, [])

  // const onSubmit = async (dataForm) => {
  //   const { error } = await updateUserRole(dataForm, auth.accessToken)

  //   if (error) {
  //     handleFetchError(error.status, error.info)
  //     return
  //   }

  //   setAuth({
  //     ...auth
  //     // ... dataForm
  //   })
  //   toast(`You are now a ${role}!`, { type: 'success' })
  //   router.push('/overview')
  // }

  return (
    <div>{role}</div>
  )
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
