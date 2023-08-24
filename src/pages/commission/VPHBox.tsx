const VPHBox = ({
  title = 'Verified pay amount',
  amount = '$ 567.16',
  bgColor = 'custom-green',
  additionalText1,
  additionalText2
}) => {
  return (
    <div className={`px-4 py-36 ${bgColor} rounded-xl text-start text-white`}>
      <h1 className="font-medium text-2xl mb-1">{title}</h1>
      <p className="font-bold text-3xl mb-1">{amount}</p>
      {additionalText1 && <p className="font-semibold text-lg uppercase">{additionalText1}</p>}
      {additionalText2 && <p className="font-semibold text-lg uppercase">{additionalText2}</p>}
    </div>
  )
}

export default VPHBox
