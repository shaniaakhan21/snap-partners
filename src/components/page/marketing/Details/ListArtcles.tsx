export const ListArticles = ({ children } /* Should be Article Component */) => {
  return (
    <ul className='w-full flex flex-wrap justify-center 2xl:justify-between items-center gap-x-6 gap-y-4 mt-10'>
      {children}
    </ul>
  )
}
