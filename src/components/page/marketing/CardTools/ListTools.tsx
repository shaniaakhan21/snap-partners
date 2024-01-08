export const ListMarketingTools = ({ children } /* Should be Tool Component */) => {
  return (
    <ul className='w-full flex flex-wrap justify-center xl:justify-between items-center gap-x-2 gap-y-4 m-0 mt-4 lg:m-4'>
      {children}
    </ul>
  )
}
