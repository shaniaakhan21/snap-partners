import { useRef } from 'react'
import { IBOIcon, ArrowRightIcon } from 'components/common/icons'
import { ROLES } from 'config/roles'
import { GTMTrack } from 'lib/utils/gtm'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AssociateIcon } from 'components/common/icons/Associate'
import { Trans, useTranslation } from 'next-i18next'

export const SelectRoleForIntegrousSignUp = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const queryReferralCode = router.query.referralCode as string
  const roles = [
    {
      icon: <IBOIcon classes='w-14 h-14' />,
      label: t('auth:signup.integrous.register_as_customer'),
      key: ROLES.integrousCustomer,
      link: `/auth/signup-integrous?role=${ROLES.integrousCustomer}&referralCode=${queryReferralCode}`
    },

    {
      icon: <AssociateIcon classes='w-14 h-14' />,
      label: t('auth:signup.integrous.register_as_associate'),
      key: ROLES.integrousAssociate,
      link: `/auth/signup-integrous?role=${ROLES.integrousAssociate}&referralCode=${queryReferralCode}`
    }
  ]

  const onRoleClick = (role) => {
    GTMTrack.signUp(role.key)
    router.push(role.link)
  }

  return (
    <div className='text-center h-[85vh] flex flex-col justify-center items-center w-full'>
      <span className='text-3xl text-gray-800 font-bold'>{t('auth:signup.integrous.welcome')}</span>
      <p className='text-gray-600 font-semibold'>
        <Trans i18nKey='auth:signup.integrous.subtitle' components={{ br: <br className='hidden sm:block' /> }} />
      </p>

      <ul className='flex flex-col justify-center items-center my-4 gap-y-4 w-full'>
        {
          roles.map(role => {
            return (
              <li key={role.key} className='max-w-md w-full bg-gray-200 hover:bg-gray-300 rounded-md'>
                <button
                  onClick={() => onRoleClick(role)}
                  className='w-full py-4 px-5 flex justify-between items-center gap-x-8'
                >
                  {role.icon}

                  <div className='flex justify-end items-center'>
                    <span className='text-lg font-bold text-gray-800'>{role.label}</span>
                    <ArrowRightIcon classes='mt-0.5' />
                  </div>
                </button>
              </li>
            )
          })
        }
      </ul>

      <br />
      <p className='text-gray-700 font-semibold'>{t('auth:signup.integrous.or')}</p>
      <br />

      <p>
        <span className='font-bold text-gray-800'>{t('auth:signup.integrous.already_have_account')}</span>
        <Link href='/auth/login-integrous'>
          <a className='text-textAcent-500'>{t('auth:signup.integrous.login')}</a>
        </Link>
      </p>
    </div>
  )
}
