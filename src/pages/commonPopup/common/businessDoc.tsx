import { Button, Modal } from '@mui/material'
import { Close as CrossIcon, CloudUpload } from '@mui/icons-material'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'
import { IAuth, TSetAuth, useAuthStore } from 'lib/stores/Auth'
import { toast } from 'react-toastify'
import { addBStructureDoc } from 'lib/services/user/addBStructureDoc'
import { addIRSDocs } from 'lib/services/user/addIRSDoc'

interface PopupProps {
  open: boolean;
  onClose: () => void;
  auth?: IAuth;
  setAuth?: TSetAuth;
  docIrsURL?: string;
  docFormURL?: string;
}

const BusinessDocPopup = ({ open, onClose, docIrsURL, docFormURL }: PopupProps) => {
  const [documentIRS, setDocumentIRS] = useState(docIrsURL)
  const [documentForm, setDocumentBStructure] = useState(docFormURL)
  const [filenameIRS, setFilenameIRS] = useState('')
  const [filenameForm, setFilenameForm] = useState('')
  const { auth, setAuth } = useAuthStore()
  const [storedBStructureDocument, setStoredBStructureDocument] = useState(null)
  const [storedIRSDocument, setStoredIRSDocument] = useState(null)

  useEffect(() => {
    setDocumentIRS(documentIRS)
  }, [docIrsURL])

  useEffect(() => {
    setDocumentBStructure(documentForm)
  }, [docFormURL])

  const handleBStructureDocChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.nativeEvent.target as HTMLInputElement
    const files = input.files
    const bStructureDocumentData = files[0]
    if (files?.length > 0) {
      try {
        setFilenameForm(bStructureDocumentData.name)
        setStoredBStructureDocument(files[0])
        const url = URL.createObjectURL(bStructureDocumentData)
        setDocumentBStructure(url)
        console.log('auth after structure doc', auth)
      } catch (error) {
        toast('Document could not be Uploaded!', { type: 'error' })
      }
    }
  }
  const handleIRSDocChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.nativeEvent.target as HTMLInputElement
    const files = input.files
    const irsDocumentData = files[0]
    if (files?.length > 0) {
      try {
        setFilenameIRS(irsDocumentData.name)
        setStoredIRSDocument(files[0])
        const url = URL.createObjectURL(irsDocumentData)
        setDocumentIRS(url)
        console.log('auth after IRS doc', auth)
      } catch (error) {
        toast('Document could not be Uploaded!', { type: 'error' })
      }
    }
  }

  const handleProceedWithVerification = async () => {
    try {
      const bStructureDocumentData = storedBStructureDocument
      const irsDocumentData = storedIRSDocument

      await addBStructureDoc(auth.accessToken, { doc_b_structure: bStructureDocumentData })
      await addIRSDocs(auth.accessToken, { doc_irs: irsDocumentData })

      setAuth({
        ...auth,
        doc_b_structure: storedBStructureDocument,
        doc_irs: storedIRSDocument
      })
      toast('Documents Uploaded Successfully!', { type: 'success' })
    } catch (error) {
      toast('Document could not be Uploaded, Try again later!', { type: 'error' })
    }
  }

  const isProceedEnabled = storedBStructureDocument && storedIRSDocument

  return (
    <Modal open={open} onClose={onClose} className='overflow-y-scroll'>
      <div className='w-full flex justify-center outline-none'>
        <div className='bg-white rounded-xl p-2 md:p-4 md:px-10 md:pb-10 w-9/12 md:w-6/12 my-8 md:my-20 md:ml-10bg-white rounded-xl p-2 md:p-4 md:px-10 md:pb-10 w-9/12 md:w-6/12 my-8 md:my-20 md:ml-10'>
          <div className='flex flex-row justify-end'>
            <div>
              <CrossIcon onClick={onClose} className='text-base md:text-2xl 2xl:text-5xl cursor-pointer' />
            </div>
          </div>
          <div className='flex flex-col justify-center text-center'>
            <div className='flex w-full justify-center m-1'>
              <img className='w-1/6' src='/static/doc-icon.png' alt="Popup Image" id='' />
            </div>
            <h3 className='text-lg md:text-2xl  font-semibold mt-2'>Additional Documentation Required</h3>
            <h5 className='md:mx-10 md:mt-2 font-semibold text-xs mt-1 md:text-base text-[#878787]'>To verify and approve your business entity submission, please complete and upload a Business Entity Registration form, along with proof of IRS EIN and business formation documents.</h5>
          </div>
          <div className='flex flex-col md:flex-row'>
            <div className='w-full flex flex-col justify-center items-center'>

              <input
                type="file"
                accept=".pdf, .png, .jpg, .jpeg"
                onChange={handleBStructureDocChange}
                className="hidden"
                id="document-upload-input-form"
                name="doc_b_structure"
              />
              <br/>
              <div className='ml-0 md:ml-10 text-center'>
                <a href='https://snap-delivered.nyc3.digitaloceanspaces.com/documents/BusinessEntityRegistrationForm_11.01.2023.pdf' target="_blank"><span className='text-base md:text-xl font-semibold underline'>Business Entity Registration Form</span></a>
                <label className='w-full' htmlFor="document-upload-input-form">
                  <div className='text-base md:text-xl rounded-xl text-center px-8 md:px-16 capitalize py-4 text-base border-2 border-gray cursor-pointer my-4 shadow-md'>
                    <CloudUpload /> Upload Document
                  </div>
                </label>
              </div>
              <div className="text-[#878787] text-sm mb-2">{filenameForm}</div>
            </div>
            <div className='w-full flex flex-col justify-center items-center'>
              <input
                type="file"
                accept=".pdf, .png, .jpg, .jpeg"
                onChange={handleIRSDocChange}
                className="hidden"
                id="document-upload-input-irs"
                name="doc_irs"
              />
              <br/>
              <div className='text-center'>
                <span className='text-sm md:text-lg font-semibold '>Proof of IRS EIN / Business Formation Documents</span>
                <label className='w-full flex justify-center' htmlFor="document-upload-input-irs">
                  <div className='md:w-10/12 text-base md:text-xl rounded-xl text-center px-8 md:px-14 capitalize py-4 text-base border-2 border-gray cursor-pointer my-4 shadow-md'>
                    <CloudUpload /> Upload Document
                  </div>
                </label>
              </div>
              <div className="text-[#878787] text-sm mb-2">{filenameIRS}</div>
            </div>
          </div>

          <div className='w-full flex justify-center'>
            <Button
              type="submit"
              variant="contained"
              onClick={handleProceedWithVerification}
              className={`text-sm text-white md:text-xl rounded-xl text-center px-8 capitalize py-4 text-base ${
                isProceedEnabled ? 'bg-primary-500' : 'bg-gray-300 cursor-not-allowed'
              }`}
              disabled={!isProceedEnabled}
            ><Link href='/' >
                Proceed With Documents Verification
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default BusinessDocPopup
