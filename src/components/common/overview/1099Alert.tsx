import { Button } from '@mui/material'
import { useAuthStore } from 'lib/stores'
import CommonPopup from 'pages/commonPopup/common/index'
import BusinessDocPopup from 'pages/commonPopup/common/businessDoc'
import { useState } from 'react'

export default function AlertWidget () {
  const { auth, setAuth } = useAuthStore()
  const TinStatus = auth.TINstatus
  const [showFailedPopup, setShowFailedPopup] = useState(false)
  const [showBDocPopup, setShowBdocPopup] = useState(false)

  const handleClick = () => {
    if (TinStatus === 'individual') {
      setShowFailedPopup(true)
    } else if (TinStatus === 'business') {
      setShowBdocPopup(true)
    }
  }

  return (
    <>
      <div className='bg-white p-4 px-6 rounded-lg mb-4 border-2 border-[#000000] shadow-lg'>
        <h1 className="font-bold text-sm lg:text-lg uppercase mb-4">Please upload the documents for 1099 verification:</h1>
        <Button
          type="submit"
          variant="contained"
          onClick={handleClick}
          className='bg-[#E74426] text-white font-bold text-xs lg:text-sm p-2 lg:p-2 rounded-lg'
        >
                    Upload Documents
        </Button>
      </div>

      {showFailedPopup && (
        <CommonPopup
          image="/static/error.svg"
          title="Snap cannot update your profile"
          description="Reason: Since your involvement with Snap, you have submitted two different social security #’s."
          buttonText="Proceed with document verification"
          svgId="popupImage-failed"
          open={showFailedPopup}
          onClose={() => setShowFailedPopup(false)}
          showDocumentUpload={true}
          auth={auth} setAuth={setAuth} docURL={auth.SSNDocURL}
        />
      )}

      {showBDocPopup && (
        <BusinessDocPopup
          open={showBDocPopup}
          onClose={() => setShowBdocPopup(false)}
          auth={auth}
          setAuth={() => {}}
          docIrsURL={auth.doc_irs}
          docFormURL={auth.doc_b_structure}
        />
      )}
    </>
  )
}
