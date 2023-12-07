import { Button, Modal } from '@mui/material'
import { Close as CrossIcon, East, CloudUpload } from '@mui/icons-material'
import Link from 'next/link'
import { MouseEvent, ChangeEvent, useEffect, useState, useRef } from 'react'
import { addVerificationDocuments } from 'lib/services/user/addVerificationDocuments'
import { IAuth, TSetAuth } from 'lib/stores/Auth'
import { toast } from 'react-toastify'
import axios from 'axios'

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
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [documentChangeComplete, setDocumentChangeComplete] = useState(false)

  useEffect(() => {
    setDocument(document)
  }, [docURL])

  const handleLoadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.nativeEvent.target as HTMLInputElement
    const files = input.files

    if (files?.length > 0) {
      const file = files[0]
      setFilename(file.name)
      const url = URL.createObjectURL(file)
      setDocument(url)
    }
  }

  const handleDocumentChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = fileInputRef.current
    const files = input?.files
    if (files?.length > 0) {
      try {
        const file = files[0]
        await addVerificationDocuments(auth.accessToken, { image: file })
        const url = URL.createObjectURL(file)
        setDocument(url)
        setAuth({ ...auth, SSNDocURL: url })
        toast('Document Uploaded Successfully!', { type: 'success' })
        setDocumentChangeComplete(true)
      } catch (error) {
        toast('Document could not be Uploaded!', { type: 'error' })
        setDocumentChangeComplete(false)
      }
    }
  }

  const handleButtonClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (buttonText === 'Proceed with document verification') {
      handleDocumentChange(event as ChangeEvent<HTMLInputElement>)
      setTimeout(() => {
        onClose()
      }, 2500)
    } else {
      window.location.reload()
    }
  }

  useEffect(() => {
    if (documentChangeComplete) {
      onClose()
    }
  }, [documentChangeComplete, onClose])

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
                onChange={handleLoadFile}
                className="hidden"
                id="document-upload-input"
                ref={fileInputRef}
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
              onClick={(event: MouseEvent<HTMLButtonElement>) => handleButtonClick(event as any)}
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
