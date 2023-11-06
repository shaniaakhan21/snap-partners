import { Button, Modal } from '@mui/material'
import { Close as CrossIcon, East, CloudUpload } from '@mui/icons-material'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'
import { addVerificationDocuments } from 'lib/services/user/addVerificationDocuments'
import { IAuth, TSetAuth } from 'lib/stores/Auth'
import { toast } from 'react-toastify'

interface PopupProps {
  open: boolean;
  onClose: () => void;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  svgId: string;
  showDocumentUpload: boolean;
  auth?: IAuth;
  setAuth?: TSetAuth;
  docURL?: string;
}

const CommonPopup = ({ open, onClose, image, title, docURL, description, auth, setAuth, buttonText, svgId, showDocumentUpload }: PopupProps) => {
  const [document, setDocument] = useState(docURL)
  const [filename, setFilename] = useState('')
  useEffect(() => {
    setDocument(document)
  }, [docURL])

  const handleDocumentChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.nativeEvent.target as HTMLInputElement
    const files = input.files
    if (files?.length > 0) {
      try {
        const file = files[0]
        setFilename(file.name)
        await addVerificationDocuments(auth.accessToken, { image: file })
        const url = URL.createObjectURL(file)
        setDocument(url)
        setAuth({ ...auth, SSNDocURL: url })
        toast('Loading the Document!', { type: 'success' })
      } catch (error) {
        toast('Document could not be Uploaded!', { type: 'error' })
      }
    }
  }

  return (
    <Modal open={open} onClose={onClose} className='overflow-y-scroll'>
      <div className='w-full flex justify-center outline-none'>
        <div className='bg-white rounded-xl p-4 px-10 pb-10 w-6/12 my-20 ml-10'>
          <div className='flex flex-row justify-end'>
            <div>
              <CrossIcon onClick={onClose} className='text-5xl cursor-pointer' />
            </div>
          </div>
          <div className='flex flex-col justify-center text-center'>
            <div className='flex w-full justify-center m-1'>
              <img src={image} alt="Popup Image" id={svgId} />
            </div>
            <h3 className='text-2xl font-semibold mt-2'>{title}</h3>
            <h5 className='font-semibold text-[#878787]'>{description}</h5>
          </div>
          {showDocumentUpload && (
            <div className='w-full flex flex-col justify-center items-center'>
              <input
                type="file"
                accept=".pdf, .png, .jpg, .jpeg"
                onChange={handleDocumentChange}
                className="hidden"
                id="document-upload-input"
              />
              <br/>
              <label htmlFor="document-upload-input">
                <div className='send-button text-xl rounded-xl text-center px-16 capitalize py-4 text-base border-2 border-gray cursor-pointer my-4 shadow-md'>
                  <CloudUpload /> Upload Document
                </div>
              </label>
              <div className="text-[#878787] text-sm mb-2">{filename}</div>
            </div>
          )}
          <div className='w-full flex justify-center'>
            <Button
              type="submit"
              variant="contained"
              className='send-button text-xl rounded-xl text-center px-8 capitalize py-4 text-base bg-primary-500'
              onClick={() => {
                if (buttonText === 'Proceed with document verification') {
                  toast('Document Uploaded Successfully!', { type: 'success' })
                  onClose()
                } else {
                  window.location.reload()
                }
              }}
            ><Link href='/' >
                {buttonText}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default CommonPopup
