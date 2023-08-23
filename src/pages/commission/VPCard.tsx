const VPCard = ({
  title = 'Verified pay amount',
  amount = '$ 567.16',
  detailsText = 'Click for details',
  bgColor = 'custom-green',
  onClick
}) => {
  return (
    <div className={`p-3 ${bgColor} rounded-xl text-center text-white`}>
      <h1 className="font-medium text-2xl mb-1">{title}</h1>
      <p className="font-light underline text-xl mb-1">{amount}</p>
      <a className="font-light underline text-xl" onClick={onClick}>{detailsText}</a>
    </div>
  )
}

export default VPCard
