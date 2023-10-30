import { Button, Modal } from '@mui/material'
import { Close as CrossIcon } from '@mui/icons-material'
import Link from 'next/link';

interface PopupProps {
  open: boolean;
  onClose: () => void;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  svgId: string;
}

const CommonPopup = ({ open, onClose, image, title, description, buttonText, svgId }: PopupProps) => {
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
          <br />
          <div className='w-full flex justify-center'>
            <Button
              type="submit"
              variant="contained"
              className='send-button text-xl rounded-xl text-center px-8 capitalize py-4 text-base bg-primary-500'
              onClick={() => {
                window.location.reload()
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
