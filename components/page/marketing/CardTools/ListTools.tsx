export const ListMarketingTools = ({ children } /* Should be Tool Component */) => {
  return (
    <ul className='max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-x-3 gap-y-4 mt-16'>
      {children}
    </ul>
  )
}
