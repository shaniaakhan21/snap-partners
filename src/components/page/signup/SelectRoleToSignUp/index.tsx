import { DriverIcon, MerchantsIcon, ArrowRightIcon, CustomerIcon } from 'components/common/icons'
import { ROLES } from 'config/roles'
import { GTMTrack } from 'lib/utils/gtm'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

export const SelectRoleToSignUp = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const roles = [
    {
      icon: <CustomerIcon classes='w-14 h-14' />,
      label: t('auth:signup.i-am-a-customer'),
      key: ROLES.CUSTOMER,
      link: `/auth/signup?role=${ROLES.CUSTOMER}`
    },
    {
      icon: <DriverIcon classes='w-14 h-14' />,
      label: t('auth:signup.i-am-a-driver'),
      key: ROLES.DRIVER,
      link: `/auth/signup?role=${ROLES.DRIVER}`
    },
    {
      icon: <MerchantsIcon classes='w-14 h-14' />,
      label: t('auth:signup.i-am-a-merchant'),
      key: ROLES.MERCHANT,
      link: `/auth/signup?role=${ROLES.MERCHANT}`
    }
  ]

  const onRoleClick = (role) => {
    GTMTrack.signUp(role.key)
    router.push(role.link)
  }

  return (
    <div className='text-center h-[85vh] flex flex-col justify-center items-center w-full'>
      <span className='text-3xl text-gray-800 font-bold'>{t('auth:signup.welcome')}</span>
      <p className='text-gray-600 font-semibold'>{t('auth:signup.subtitle').split('{{br}}')?.[0]}<br className='hidden sm:block' />{t('auth:signup.subtitle').split('{{br}}')?.[1]}</p>

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
      <p className='text-gray-700 font-semibold'>{t('auth:signup.or')}</p>
      <br />

      <p>
        <span className='font-bold text-gray-800'>{t('auth:signup.already-have-an-account')}</span>
        {' '}
        <Link href='/auth/login'>
          <a className='text-textAcent-500'>{t('auth:signup.login')}</a>
        </Link>
      </p>
    </div>
  )
}
