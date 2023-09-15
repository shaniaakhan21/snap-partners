import { Modal } from '@mui/material'
import QualifiedIBOTable from './QualifiedIBOTable'

const IBOTableModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className="fixed left-0 flex flex-col justify-center items-center w-screen h-screen bg-black bg-opacity-60">
        <button className="top-[-10%] mb-0 relative left-[19%] text-black hover:text-black" onClick={onClose}>
          <img src='/static/promotion/close-btn.svg'/>
        </button>
        <QualifiedIBOTable />
      </div>
    </Modal>
  )
}

export default IBOTableModal
