const ContractTextHead = ({ smallHeading, bigHeading, smallHeading2 }) => {
  return (
    <div>
      <p className="text-gray-600 text-base font-medium">{smallHeading}</p>
      <h1 className="text-textAcent-600 text-4xl font-bold mt-2">{bigHeading}</h1>
      <p className="text-black-800 text-2xl font-bold">{smallHeading2}</p>
    </div>
  )
}

export default ContractTextHead
