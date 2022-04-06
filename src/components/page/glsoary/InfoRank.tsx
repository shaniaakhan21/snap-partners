export const InfoRank = ({ rank }) => {
  return (
    <li key={rank.title} className='max-w-lg w-full'>
      <article>
        <section className='flex justify-start items-start'>
          {
            rank.icons.map(icon => (
              <img src={icon} className='mr-4' />
            ))
          }

          <span className='text-xl font-bold'>{rank.title}</span>
        </section>

        <section className='mt-4 bg-primary-500 rounded-md p-4 text-white'>
          <span className='font-semibold text-lg'>Qualifications</span>
          <br /><br />

          {rank.qualifications}
        </section>
      </article>
    </li>
  )
}
