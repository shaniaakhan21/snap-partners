export const ListMarketingTools = ({ children } /* Should be Tool Component */) => {
  return (
    <ul className='w-full flex flex-wrap justify-center xl:justify-between items-center gap-x-2 gap-y-4 mt-16'>
      {children}
    </ul>
  )
}
