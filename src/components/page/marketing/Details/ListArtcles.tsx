export const ListArticles = ({ children } /* Should be Article Component */) => {
  return (
    <ul className='w-full flex flex-wrap justify-center 2xl:justify-between items-start gap-x-6 gap-y-6 mt-10'>
      {children}
    </ul>
  )
}
