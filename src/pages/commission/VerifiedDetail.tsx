import Tier from './Tier'
import VPHBox from './VPHBox'

const VerifiedDetail = () => {
  return (
    <div className="w-full bg-white rounded-lg px-6 py-8 flex flex-row justify-between">
      <div className="w-3/12">
        <VPHBox/>
      </div>
      <div className="w-8/12 ml-4">
        <Tier/>
      </div>
    </div>
  )
}

export default VerifiedDetail
