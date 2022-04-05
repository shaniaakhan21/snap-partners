import { GooglePlayBanner } from 'components/common/icons'

export const AndroidLinkApp = ({ androidApp, trackStore }) => {
  return (
    <li key={androidApp.link}>
      <article>
        <h6 className='text-2xl 2xl:text-3xl font-bold text-primary-500'>{androidApp.title}</h6>
        <span className='text-xl font-semibold text-gray-700'>{androidApp.subtitle}</span> <br />
        <p className='text-gray-700'>{androidApp.description}</p>

        <a
          href={androidApp.link}
          onClick={() => trackStore('android')}
          target='_blank'
          rel='noopener noreferrer'
          className='block w-fit mt-4'
        >
          <GooglePlayBanner classes='w-36' />
        </a>
      </article>
    </li>
  )
}
