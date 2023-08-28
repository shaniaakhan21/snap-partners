import TeamBonusTable from './TeamBonusTable'

interface DataRow {
    id: number;
    itemId: string;
    orderDate: string;
    customer: string;
    product: string;
    cv: string;
    total: string;
    lv1: string;
    lv2: string;
    lv3: string;
    lv4: string;
    lv5: string;
    lv6: string;
    sup1: string;
}

interface VerifiedTeamBonusProps {
  data: DataRow[];
  headerText?: string;
  subText?: string;
}

export default function VerifiedTeamBonus ({ data, headerText = 'Verified Team Bonus - Rank Director', subText = 'Comp Detail' } : VerifiedTeamBonusProps) {
  return (
    <div className='ml-2'>
      <div className='flex flex-row justify-between'>
        <div className="font-semibold text-base lg:text-2xl text-slate-700 mb-4 mt-1">
          <h1>{headerText}</h1>
        </div>
        <div className="font-semibold text-base lg:text-2xl text-slate-700 mb-4 mt-1">
          <h1>{subText}</h1>
        </div>
      </div>
      <TeamBonusTable rowData={data} />
    </div>
  )
}
