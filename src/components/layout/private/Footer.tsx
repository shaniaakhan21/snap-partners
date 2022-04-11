import { AppleIcon, GooglePlayIcon, YoutubeIcon } from 'components/common/icons'
import Link from 'next/link'
import { useRef } from 'react'

export const FooterPrivate = () => {
  const { current: footerLinks } = useRef([
    { to: 'https://opportunity.snapdelivered.com/#about', label: 'About us' },
    { to: 'https://store.snapdelivered.com/', label: 'Merch Store' },
    { to: 'https://opportunity.snapdelivered.com/#contact', label: 'Opportunities with Snap Delivered' },
    { to: 'https://opportunity.snapdelivered.com/#contact', label: 'Support' },
    { to: '/legal/privacy-policy', label: 'Privacy policy' },
    { to: '/legal/terms-of-use', label: 'Terms of Use' }
  ])

  const { current: socialLinks } = useRef([
    { to: '/download-app?device=APPLE', icon: <AppleIcon classes='w-6 h-6' /> },
    { to: '/download-app?device=ANDROID', icon: <GooglePlayIcon classes='w-6 h-6' /> },
    { to: 'https://www.youtube.com/channel/UC7zzJ0gaX5QrE8lPqG_Lr1w', icon: <YoutubeIcon classes='w-6 h-6' /> }
  ])

  return (
    <footer className='w-full bg-transparent p-4 text-sm'>
      <div className='max-w-7xl mx-auto 2xl:flex 2xl:justify-center 2xl:items-center 2xl:gap-x-3'>
        <ul className='grid place-content-center grid-flow-row md:grid-rows-2 grid-cols-1 md:grid-cols-3 2xl:flex 2xl:justify-start 2xl:items-start 2xl:gap-x-4 text-gray-800 gap-y-2 2xl:mr-3'>
          {
            footerLinks.map(footerLink => (
              <li key={footerLink.label}>
                <Link href={footerLink.to}>
                  <a className='hover:text-primary-500'>{footerLink.label}</a>
                </Link>
              </li>
            ))
          }
        </ul>

        <section className='flex flex-col sm:flex-row justify-between items-center 2xl:gap-x-4 2xl:mr-3'>
          <ul className='flex justify-center items-center my-4 gap-x-4'>
            {
              socialLinks.map((socialLink, index) => (
                <li key={index} className='bg-white rounded-full p-2 cursor-pointer hover:bg-primary-300 hover:bg-opacity-30'>
                  <Link href={socialLink.to}>
                    <a>{socialLink.icon}</a>
                  </Link>
                </li>
              ))
            }
          </ul>

          <div>
            <span className='text-gray-800 text-xs'>© 2022 Snap Delivered. All rights reserved.</span>
          </div>
        </section>
      </div>
    </footer>
  )
}
