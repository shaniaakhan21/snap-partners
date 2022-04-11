export const InfoRole = ({ role }) => {
  return (
    <li key={role.title}>
      <article>
        <section className='flex justify-start items-center'>
          <img src={role.icon} className='mr-4' />
          <h5 className='font-bold text-xl text-primary-500'>{role.title}</h5>
        </section>

        <section className='mt-4'>
          <span className='font-semibold text-xl'>{role.subtitle}</span>
        </section>
      </article>
    </li>
  )
}
