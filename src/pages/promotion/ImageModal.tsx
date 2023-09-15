interface ImageModalProps {
  src: string;
  onClose: () => void;
}

const ImageModal = ({ src, onClose }:ImageModalProps) => {
  return (
    <div className="fixed top-8 left-12 flex flex-col justify-center items-center w-screen h-screen bg-black bg-opacity-60">
      <button className="top-0 mb-6 relative left-1/4 text-black hover:text-black" onClick={onClose}>
        <img src='/static/promotion/close-btn.svg'/>
      </button>
      <div className="bg-white rounded-lg p-4">
        <img src={src} alt="Zoomed In Image" />
      </div>
    </div>
  )
}

export default ImageModal
