import { AppleIcon, GooglePlayIcon, YoutubeIcon } from 'components/common/icons'
import Link from 'next/link'
import { useRef } from 'react'

export const Footer = () => {
  const { current: footerLinks } = useRef([
    { to: '#', label: 'About us' },
    { to: '#', label: 'Merch Store' },
    { to: '#', label: 'Opportunities with Snap Delivered' },
    { to: '#', label: 'Support' },
    { to: '#', label: 'Privacy policy' },
    { to: '#', label: 'Terms of Use' }
  ])

  const { current: socialLinks } = useRef([
    { to: '#', icon: <AppleIcon classes='w-6 h-6' /> },
    { to: '#', icon: <GooglePlayIcon classes='w-6 h-6' /> },
    { to: '#', icon: <YoutubeIcon classes='w-6 h-6' /> }
  ])

  return (
    <footer className='w-full bg-gray-300 p-4'>
      <div className='max-w-7xl mx-auto 2xl:flex 2xl:justify-start 2xl:items-center 2xl:gap-x-3'>
        <ul className='grid place-content-center grid-flow-row md:grid-rows-2 grid-cols-1 md:grid-cols-3 2xl:flex 2xl:justify-start 2xl:items-start 2xl:gap-x-4 text-gray-800 gap-y-2 2xl:mr-3'>
          {
            footerLinks.map(footerLink => (
              <li key={footerLink.label}>
                <Link href={footerLink.to}>
                  <a>{footerLink.label}</a>
                </Link>
              </li>
            ))
          }
        </ul>

        <section className='flex flex-col sm:flex-row justify-between items-center 2xl:gap-x-4 2xl:mr-3'>
          <ul className='flex justify-center items-center my-4 gap-x-4'>
            {
              socialLinks.map((socialLink, index) => (
                <li key={index} className='bg-white rounded-full p-2 cursor-pointer'>
                  {socialLink.icon}
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
