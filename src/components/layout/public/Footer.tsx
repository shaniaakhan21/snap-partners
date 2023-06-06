import { FooterApple, FooterFacebook, FooterYoutube } from 'components/common/icons'
import { FooterAndroid } from 'components/common/icons/FooterAndroid'
import { APP_INFO } from 'config/appInfo'
import { ROLES } from 'config/roles'
import { GTMTrack } from 'lib/utils/gtm'
import Link from 'next/link'
import { useRef } from 'react'
import { useTranslation } from "next-i18next";

const { RRSS, LEGAL } = APP_INFO

export const FooterPublic = () => {
  const { t } = useTranslation()
  const { current: socialLinks } = useRef([
    { to: RRSS.FACEBOOK.link, icon: <FooterFacebook />, label: 'facebook' },
    { to: RRSS.YOUTUBE.link, icon: <FooterYoutube />, label: 'youtube' }
  ])

  const { current: joinUsLinks } = useRef([
    { to: 'https://opportunity.snapdelivered.com/#about', label: t('footer:join.about-us') },
    { to: `/auth/signup?role=${ROLES.DRIVER}`, label: t('footer:join.become-a-driver') },
    { to: `/auth/signup?role=${ROLES.MERCHANT}`, label: t('footer:join.become-a-merchant') },
    { to: `/auth/signup?role=${ROLES.CUSTOMER}`, label: t('footer:join.become-a-customer') },
    { to: 'https://opportunity.snapdelivered.com/#contact', label: t('footer:join.careers') },
    { to: 'https://store.snapdelivered.com/', label: t('footer:join.merch-store') }
  ])

  // const { current: helpLinks } = useRef([
  //   { to: '#faqs', label: 'FAQs' },
  //   { to: '#training', label: 'Training Videos' },
  //   { to: '#fms', label: 'File Management System' }
  // ])

  const { current: Apps } = useRef([
    { to: '/download-app?device=APPLE', icon: <FooterApple /> },
    { to: '/download-app?device=ANDROID', icon: <FooterAndroid /> }
  ])

  const { current: legalLinks } = useRef([
    { to: LEGAL.PRIVACY_POLICY.to, label: LEGAL.PRIVACY_POLICY.label },
    { to: LEGAL.TERMS_OF_USE.to, label: LEGAL.TERMS_OF_USE.label }
    // { to: '#cookies', label: 'Cookies Policy' }
  ])

  return (
    <footer className='w-full h-full bg-gray-800 text-white'>
      <div className='w-full px-4 lg:px-14 py-10 flex flex-col lg:flex-row justify-center lg:justify-between items-start'>
        <section>
          <img src='/images/logo-white.png' className='w-14' />

          <ul className='flex justify-start items-center gap-x-4 mt-6'>
            {socialLinks.map(socialLink => (
              <li key={socialLink.to}>
                <a
                  href={socialLink.to}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex justify-center items-center h-14 w-14 rounded-full bg-[#19191929] cursor-pointer hover:bg-primary-300 hover:bg-opacity-20'
                  onClick={() => GTMTrack.footer('public', socialLink.label)}
                >
                  {socialLink.icon}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className='flex flex-col lg:flex-row justify-end items-start gap-x-28 gap-y-10 mt-10 lg:mt-0'>
          <section className='text-left lg:text-right'>
            <span className='text-2xl font-semibold'>{t('footer:join-us')}</span>

            <ul className='mt-2 text-gray-300'>
              {joinUsLinks.map(joinUsLink => (
                <li key={joinUsLink.to} className='mt-2'>
                  <Link href={joinUsLink.to}>
                    <a
                      className='hover:text-primary-500'
                      onClick={() => GTMTrack.footer('public', joinUsLink.label)}
                    >
                      {joinUsLink.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* <section className='text-left lg:text-right'>
            <span className='text-2xl font-semibold'>Let us help you</span>

            <ul className='mt-2 text-gray-300'>
              {helpLinks.map(helpLink => (
                  <li key={helpLink.to} className='mt-2'>
                    <Link href={helpLink.to}>
                      <a className='hover:text-primary-500'>{helpLink.label}</a>
                    </Link>
                  </li>
                ))}
            </ul>
          </section> */}

          <section className='text-left lg:text-right'>
            <span className='text-2xl font-semibold'>{t('footer:download-our-app')}</span>

            <ul className='mt-2 text-gray-300 flex justfiy-start lg:justify-end items-start gap-x-4'>
              {Apps.map(app => (
                <li key={app.to}>
                  <Link key={app.to} href={app.to}>
                    <a className='mt-2 flex justify-center items-center h-14 w-14 rounded-full bg-[#19191929] cursor-pointer hover:bg-primary-300 hover:bg-opacity-20'>
                      {app.icon}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className='w-full px-4 lg:px-14 pb-8 pt-7'>
        <div className='w-full border-t-2 border-t-[#585858]' />

        <div className='flex flex-col-reverse gap-y-4 lg:flex-row justify-between items-start mt-4'>
          <section>
            <span>© 2022 Snap Delivered. All rights reserved.</span>
          </section>

          <ul className='text-gray-300 flex flex-col lg:flex-row justify-end items-start gap-y-2 gap-x-6'>
            {legalLinks.map(legalLink => (
              <li key={legalLink.to}>
                <Link href={legalLink.to}>
                  <a
                    className='hover:text-primary-500'
                    onClick={() => GTMTrack.footer('public', legalLink.label)}
                  >
                    {legalLink.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
