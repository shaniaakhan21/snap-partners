type VPHBoxProps = {
  title?: string;
  amount?: string;
  bgColor?: string;
  additionalText1?: string;
  additionalText2?: string;
};
const VPHBox = ({
  title = 'Verified pay amount',
  amount = '$ 567.16',
  bgColor = 'custom-green',
  additionalText1,
  additionalText2
}: VPHBoxProps) => {
  return (
    <div className={`px-2 py-8 lg:px-4 lg:py-36 ${bgColor} rounded-xl text-start text-white`}>
      <h1 className="font-medium text-base lg:text-2xl mb-1">{title}</h1>
      <p className="font-bold text-lg lg:text-3xl mb-1">{amount}</p>
      {additionalText1 && <p className="font-semibold text-base lg:text-lg uppercase">{additionalText1}</p>}
      {additionalText2 && <p className="font-semibold text-base lg:text-lg uppercase">{additionalText2}</p>}
    </div>
  )
}

export default VPHBox
