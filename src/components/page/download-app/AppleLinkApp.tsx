import { AppleStore } from 'components/common/icons'

export const AppleLinkApp = ({ appleApp, trackStore }) => {
  return (
    <li key={appleApp.link}>
      <article>
        <h6 className='text-2xl 2xl:text-3xl font-bold text-primary-500'>{appleApp.title}</h6>
        <span className='text-xl font-semibold text-gray-700'>{appleApp.subtitle}</span> <br />
        <p className='text-gray-700'>{appleApp.description}</p>

        <a
          href={appleApp.link}
          onClick={() => trackStore('ios')}
          target='_blank'
          rel='noopener noreferrer'
          className='block w-fit mt-4'
        >
          <AppleStore classes='w-36' />
        </a>
      </article>
    </li>
  )
}
