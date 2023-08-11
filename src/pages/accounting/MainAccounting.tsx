
const MainAccounting = ({ setShowComponent }) => {
  return (
    <><div
      onClick={() => setShowComponent(true)}
      className="flex items-center space-x-5 bg-white px-2 py-2 text-textAcent-500 font-bold hover:bg-[#E35C49] focus:bg-[#E35C49] hover:text-white focus:text-white focus:outline-none"
      tabIndex={0}
    >
      <svg width="42" height="30" viewBox="0 0 42 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9167 21.25H10.5834C9.43752 21.25 8.50002 20.3125 8.50002 19.1667C8.50002 18.0208 9.43752 17.0833 10.5834 17.0833H18.9167C20.0625 17.0833 21 18.0208 21 19.1667C21 20.3125 20.0625 21.25 18.9167 21.25ZM31.4167 21.25H27.25C26.1042 21.25 25.1667 20.3125 25.1667 19.1667C25.1667 18.0208 26.1042 17.0833 27.25 17.0833H31.4167C32.5625 17.0833 33.5 18.0208 33.5 19.1667C33.5 20.3125 32.5625 21.25 31.4167 21.25ZM37.6667 23.3333C37.6667 24.4813 36.7334 25.4167 35.5834 25.4167H6.41669C5.26669 25.4167 4.33335 24.4813 4.33335 23.3333V12.9167H37.6667V23.3333ZM4.33335 6.66667C4.33335 5.51875 5.26669 4.58334 6.41669 4.58334H35.5834C36.7334 4.58334 37.6667 5.51875 37.6667 6.66667V8.75H4.33335V6.66667ZM35.5834 0.416672H6.41669C2.97085 0.416672 0.166687 3.22084 0.166687 6.66667V23.3333C0.166687 26.7792 2.97085 29.5833 6.41669 29.5833H35.5834C39.0292 29.5833 41.8334 26.7792 41.8334 23.3333V6.66667C41.8334 3.22084 39.0292 0.416672 35.5834 0.416672Z" fill="currentColor" />
      </svg>

      <style jsx>{`
div:hover > svg {
  color: white;
}
`}</style>

      <span>PayRoll</span>
    </div><div
      className="flex items-center space-x-5 bg-white px-2 py-2 text-textAcent-500 font-bold hover:bg-[#E35C49] focus:bg-[#E35C49] hover:text-white focus:text-white focus:outline-none"
      tabIndex={0}
    >
      <svg width="34" height="36" viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M31.5833 0.333328C30.4375 0.333328 29.5 1.27083 29.5 2.41666V33.6667C29.5 34.8125 30.4375 35.75 31.5833 35.75C32.7291 35.75 33.6666 34.8125 33.6666 33.6667V2.41666C33.6666 1.27083 32.7291 0.333328 31.5833 0.333328ZM17 8.66666C15.8541 8.66666 14.9166 9.60416 14.9166 10.75V33.6667C14.9166 34.8125 15.8541 35.75 17 35.75C18.1458 35.75 19.0833 34.8125 19.0833 33.6667V10.75C19.0833 9.60416 18.1458 8.66666 17 8.66666ZM0.333313 19.0833C0.333313 17.9375 1.27081 17 2.41665 17C3.56248 17 4.49998 17.9375 4.49998 19.0833V33.6667C4.49998 34.8125 3.56248 35.75 2.41665 35.75C1.27081 35.75 0.333313 34.8125 0.333313 33.6667V19.0833Z" fill="currentColor" />
      </svg>
      <style jsx>{`
div:hover > svg {
  color: white;
}
`}</style>
      <span>Pay Report</span>
    </div></>
  )
}

export default MainAccounting
