interface TotalLegProps {
  legValue: string;
  legVLabel: string;
}

const TotalLeg = ({ legValue, legVLabel } : TotalLegProps) => {
  return (
    <div className='pb-1'>
      <p className='text-sm font-bold uppercase'>{legValue}</p>
      <p className='text-sm'>{legVLabel}</p>
    </div>
  )
}

export default TotalLeg
