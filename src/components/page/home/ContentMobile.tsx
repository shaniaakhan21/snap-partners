import Link from 'next/link'
import { HomeIllustration } from 'components/common/illustrations'
import { Trans, useTranslation } from "next-i18next";

export const ContentMobile = () => {
  const { t } = useTranslation()
  return (
    <section className='w-full md:w-1/2 bg-white px-4 py-10 relative h-screen lg:hidden'> {/* Mobile */}
      <div className='flex justify-center items-center gap-x-3'>
        <div>
          <img
            src='/images/logo-dark.png'
            className='w-12 h-12'
          />
        </div>

      </div>

      <div className='mt-40 text-center'>
        <span className='text-3xl font-bold'>
          <Trans i18nKey="homepage:mobile.title" components={{ br: <br /> }} />
        </span><br />

        <Link href='/auth/signup'>
          <a className='w-full block mt-8 px-4 py-2 uppercase text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full focus:outline-none focus:ring focus:ring-primary-300 focus:opacity-90 hover:opacity-90'>
            {t('homepage:mobile.register')}
          </a>
        </Link>

        <Link href='/auth/login'>
          <a className='block mt-14 text-lg font-bold text-gray-700 uppercase hover:text-primary-500'>{t('homepage:mobile.login')}</a>
        </Link>
      </div>

      <div className='absolute -bottom-10 lg:bottom-0 left-0 w-full flex justify-center items-center'>
        <HomeIllustration />
      </div>
    </section>
  )
}
