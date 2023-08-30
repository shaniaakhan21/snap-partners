import BackButton from 'pages/accounting/BackButton'
import Tier from './Tier'
import VPHBox from './VPHBox'
import VerifiedIncomeSection from './VerifiedIncomeSection'
import VerifiedTeamBonus from './VerifiedTeamBonus'

const VerifiedDetail = ({ onBackClick }) => {
  const data = [
    {
      id: 1,
      itemId: '1234B',
      orderDate: '2023/10/15',
      customer: 'Bob Smith',
      product: 'ERC Deposit',
      pcv: '40%',
      cv: '500',
      total: '$214'
    }

  ]

  const data2 = [
    {

      id: 1,
      itemId: '1234B',
      orderDate: '2023/10/15',
      customer: 'Bob Smith',
      product: 'ERC Deposit',
      pcv: '40%',
      cv: '500',
      total: '$25.00',
      lv1: '500',
      lv2: '500',
      lv3: '500',
      lv4: '500',
      lv5: '500',
      lv6: '500',
      sup1: '5.00',
      dir: '5.00',
      dir1: '5.00',
      exe: '5.00',
      exe1: '5.00'
    },
    {

      id: 2,
      itemId: '1234B',
      orderDate: '2023/10/15',
      customer: 'Bob Smith',
      product: 'ERC Deposit',
      pcv: '40%',
      cv: '500',
      total: '$25.00',
      lv1: '500',
      lv2: '500',
      lv3: '500',
      lv4: '500',
      lv5: '500',
      lv6: '500',
      sup1: '5.00',
      dir: '5.00',
      dir1: '5.00',
      exe: '5.00',
      exe1: '5.00'
    },
    {

      id: 3,
      itemId: '1234B',
      orderDate: '2023/10/15',
      customer: 'Bob Smith',
      product: 'ERC Deposit',
      pcv: '40%',
      cv: '500',
      total: '$25.00',
      lv1: '500',
      lv2: '500',
      lv3: '500',
      lv4: '500',
      lv5: '500',
      lv6: '500',
      sup1: '5.00',
      dir: '5.00',
      dir1: '5.00',
      exe: '5.00',
      exe1: '5.00'
    }
  ]
  return (
    <>
      <BackButton onBackClick={onBackClick}/>
      <div className="w-full bg-white rounded-lg px-8 py-8 mt-4">
        <div className="w-full py-0 flex flex-col lg:flex-row justify-between">
          <div className="w-full lg:w-3/12">
            <VPHBox title="Verified pay amount" amount="$ 567.16" bgColor="custom-green"/>
          </div>
          <div className="w-full lg:w-8/12 ml-4">
            <Tier />
          </div>
        </div>
        <VerifiedIncomeSection data={data} headerText='Verified Personal Income'/>
        <VerifiedTeamBonus data={data2} />
        <div className='flex flex-row justify-between mt-4 ml-2'>
          <div>
          </div>
          <div className="font-semibold text-base lg:text-2xl text-slate-700 mb-4 mt-1">
            <h1>$80.00</h1>
          </div>
        </div>
        <VerifiedTeamBonus data={data2} headerText="Verified  Team RESIDUALS - Rank Director" subText="Comp Detail"/>
        <div className='flex flex-row justify-between mt-4 ml-2'>
          <div>
          </div>
          <div className="font-semibold text-base lg:text-2xl text-slate-700 mb-4 mt-1">
            <h1>$80.00</h1>
          </div>
        </div>
      </div></>
  )
}

export default VerifiedDetail
