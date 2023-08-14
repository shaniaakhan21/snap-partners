import BackButton from './BackButton'
import CustomSearchComponent from './CustomSearchComponent'
import CommonHeader from './CommonHeader'

const PayRunComponent = ({ onBackClick }) => (
  <div className="flex flex-col w-full">
    <BackButton onBackClick={onBackClick}/>
    <br></br>
    <div className="w-full bg-white rounded-lg px-6 py-8">
      <CommonHeader
        text="Pay Run"
        icon={
          <svg width="42" height="30" viewBox="0 0 42 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9167 21.25H10.5834C9.43752 21.25 8.50002 20.3125 8.50002 19.1667C8.50002 18.0208 9.43752 17.0833 10.5834 17.0833H18.9167C20.0625 17.0833 21 18.0208 21 19.1667C21 20.3125 20.0625 21.25 18.9167 21.25ZM31.4167 21.25H27.25C26.1042 21.25 25.1667 20.3125 25.1667 19.1667C25.1667 18.0208 26.1042 17.0833 27.25 17.0833H31.4167C32.5625 17.0833 33.5 18.0208 33.5 19.1667C33.5 20.3125 32.5625 21.25 31.4167 21.25ZM37.6667 23.3333C37.6667 24.4813 36.7334 25.4167 35.5834 25.4167H6.41669C5.26669 25.4167 4.33335 24.4813 4.33335 23.3333V12.9167H37.6667V23.3333ZM4.33335 6.66667C4.33335 5.51875 5.26669 4.58334 6.41669 4.58334H35.5834C36.7334 4.58334 37.6667 5.51875 37.6667 6.66667V8.75H4.33335V6.66667ZM35.5834 0.416672H6.41669C2.97085 0.416672 0.166687 3.22084 0.166687 6.66667V23.3333C0.166687 26.7792 2.97085 29.5833 6.41669 29.5833H35.5834C39.0292 29.5833 41.8334 26.7792 41.8334 23.3333V6.66667C41.8334 3.22084 39.0292 0.416672 35.5834 0.416672Z" fill="#DD4C37" />
          </svg>
        }
      />
      <br></br><br></br>
      <CustomSearchComponent/>
    </div>
  </div>
)

export default PayRunComponent
