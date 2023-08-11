import BackButton from './BackButton'
import CustomSearchComponent from './CustomSearchComponent'
import PayRunHeader from './PayRunHeader'

const PayRunComponent = ({ onBackClick }) => (
  <div className="flex flex-col w-full">
    <BackButton onBackClick={onBackClick}/>
    <br></br>
    <div className="w-full bg-white rounded-lg px-6 py-8">
      <PayRunHeader />
      <br></br><br></br>
      <CustomSearchComponent/>
    </div>
  </div>
)

export default PayRunComponent
