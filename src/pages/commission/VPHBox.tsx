const VPHBox = ({
  title = 'Verified pay amount',
  amount = '$ 567.16',
  detailsText = 'Click for details',
  bgColor = 'custom-green'
}) => {
  return (
    <div className={`px-5 py-36 ${bgColor} rounded-xl text-start text-white`}>
      <h1 className="font-medium text-2xl mb-1">{title}</h1>
      <p className="font-light underline text-xl mb-1">{amount}</p>
    </div>
  )
}

export default VPHBox
