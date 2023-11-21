export default function InsuranceFooter ({ ownerName }) {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="px-10 py-4">
        <div className="flex flex-row justify-center items-center">
          <div>
            <img className="w-20" src='/static/snap_partners_logo.png' alt="Snap Partners Logo" />
          </div>
          <div className="text-center mx-2">
            <h6 className="border-b border-gray-200">SNAP Referral Agent</h6>
            <h2 className="capitalize font-bold text-2xl">{ownerName}</h2>
          </div>
        </div>

      </div>
      <div className="bg-[#E7EEF2] px-10 py-4">
        <h6 className="text-[#646464] text-center">© 2022 Snap Delivered. All rights reserved.</h6>
      </div>
    </footer>
  )
}
