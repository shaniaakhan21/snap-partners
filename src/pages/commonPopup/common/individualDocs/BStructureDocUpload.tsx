import { ChangeEvent, useEffect, useState } from 'react'
import { addBStructureDoc } from 'lib/services/user/addBStructureDoc'
import { Close as CrossIcon, CloudUpload } from '@mui/icons-material'
import { IAuth, TSetAuth } from 'lib/stores/Auth'
import { toast } from 'react-toastify'
import { Button, Modal } from '@mui/material'
import Link from 'next/link'

interface BStructureDocUploadProps {
  auth: IAuth;
  setAuth: TSetAuth;
  open: boolean;
  onClose: () => void;
}

const BStructureDocUpload = ({ onClose, open, auth, setAuth }: BStructureDocUploadProps) => {
  const [documentForm, setDocumentBStructure] = useState('')
  const [filenameForm, setFilenameForm] = useState('')

  const handleBStructureDocChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.nativeEvent.target as HTMLInputElement
    const files = input.files
    if (files?.length > 0) {
      try {
        const file = files[0]
        setFilenameForm(file.name)
        await addBStructureDoc(auth.accessToken, { doc_b_structure: file })
        const url = URL.createObjectURL(file)
        setDocumentBStructure(url)
        setAuth({ ...auth, doc_b_structure: url })
      } catch (error) {
        toast('Document could not be Uploaded!', { type: 'error' })
      }
    }
  }

  useEffect(() => {
    setDocumentBStructure(documentForm)
  }, [documentForm])

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
              <img className='w-1/6' src='/static/doc-icon.png' alt="Popup Image" id='' />
            </div>
            <h3 className='text-2xl font-semibold mt-2'>Upload the Following Document</h3>
            <h5 className='mx-10 mt-2 font-semibold text-[#878787]'>To verify and approve your business entity submission, please complete and upload a Business Entity Registration form.</h5>
          </div>
          <div className='flex flex-row'>
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
              <div className='ml-10 text-center'>
                <a href='https://snap-delivered.nyc3.digitaloceanspaces.com/documents/BusinessEntityRegistrationForm_11.01.2023.pdf' target="_blank"><span className='text-xl font-semibold underline'>Business Entity Registration Form</span></a>
                <label className='w-full' htmlFor="document-upload-input-form">
                  <div className='text-xl rounded-xl text-center px-16 capitalize py-4 text-base border-2 border-gray cursor-pointer my-4 shadow-md'>
                    <CloudUpload /> Upload Document
                  </div>
                </label>
              </div>
              <div className="text-[#878787] text-sm mb-2">{filenameForm}</div>
            </div>
          </div>

          <div className='w-full flex justify-center'>
            <Button
              type="submit"
              variant="contained"
              className='text-xl rounded-xl text-center px-8 capitalize py-4 text-base bg-primary-500'
            ><Link href='/' >
                Submit
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
export default BStructureDocUpload
