const Notes = () => {
  return (
    <div className="mt-5">
      <div className="font-semibold text-2xl text-slate-700">
        <h1>Notes</h1>
      </div>
      <ul className="m-4 text-md font-medium ml-3">
        <li className="mb-1 disc-here">Pending Residuals and boundaries -  Sales that haven’t cleared the 30 day hold time.</li>
        <li className="mb-1 disc-here">Verifies Residuals and boundaries - Sales that have cleared the 30 day hold time and will payout on the next commission run.</li>
        <li className="mb-1 disc-here">Pending CABs -  ILRs you are in position to be paid on IF they become CLR within their 30 days AND they don’t request a refund period. </li>
        <li className="mb-1 disc-here">***To be qualified for commissions you must meet the minimum standards for an active rep in the business (webshop)</li>
        <li className="mb-1 disc-here">*** Bonuses are only pay out to qualifying rank of CLR or higher (100 BV on payday)</li>
      </ul>
    </div>
  )
}

export default Notes
