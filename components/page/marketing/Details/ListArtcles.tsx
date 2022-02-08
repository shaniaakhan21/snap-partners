export const ListArticles = ({ children } /* Should be Article Component */) => {
  return (
    <ul className='max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-x-6 gap-y-4 mt-16'>
      {children}
    </ul>
  )
}
