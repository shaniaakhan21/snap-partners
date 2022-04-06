export const InfoApp = ({ app }) => {
  return (
    <li key={app.title}>
      <article>
        <h5 className='font-bold text-xl text-primary-500'>{app.title}</h5>
        <span className='font-semibold'>{app.subtitle}</span>
        <p>{app.description}</p>
      </article>
    </li>
  )
}
