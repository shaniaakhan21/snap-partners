import { Modal } from '@mui/material'
import ERCClientsTable from './ERCClientsTable'

const ERCTableModal = ({ open, onClose, sprintData, ercModalData }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className="fixed left-0 flex flex-col justify-center items-center w-screen h-screen bg-black bg-opacity-60">
        <button className="top-[-10%] mb-0 relative left-[35%] w-[10%] xs:w-[fit-content] xs:left-[23%] text-black hover:text-black" onClick={onClose}>
          <img src='/static/promotion/close-btn.svg'/>
        </button>
        <ERCClientsTable sprintData={sprintData} ercModalData={ercModalData} />
      </div>
    </Modal>
  )
}

export default ERCTableModal
