import PersonalIncomeTable from './PersonalIncomeTable'

interface DataRow {
  id: number;
  itemId: string;
  orderDate: string;
  customer: string;
  product: string;
  pcv: string;
  cv: string;
  total: string;
}

interface VerifiedIncomeSectionProps {
  data: DataRow[];
  headerText?: string;
}

export default function VerifiedIncomeSection ({ data, headerText = 'Verified Personal Income' } : VerifiedIncomeSectionProps) {
  return (
    <div className='ml-2'>
      <div className="font-semibold text-2xl text-slate-700 mb-4 mt-1 ">
        <h1>{headerText}</h1>
      </div>
      <PersonalIncomeTable rowData={data} />
    </div>
  )
}
