interface TotalLegProps {
  legValue: number;
  legVLabel: string;
}

const TotalLeg = ({ legValue, legVLabel } : TotalLegProps) => {
  return (
    <div className='pb-1 pt-2'>
      <p className='text-sm font-bold uppercase'>{legVLabel}</p>
      <p className='text-sm'>{legValue}</p>
    </div>
  )
}

export default TotalLeg
