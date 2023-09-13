interface FirstColProps {
    image: string;
    text: string;
}
const FirstCol = ({ image, text }: FirstColProps) => (
  <div className="light-bg-color py-64 flex flex-col items-center">
    <img src={image} alt="Image" />
    <p className="text-2xl text-gray-800 font-semibold text-center">{text}</p>
  </div>
)

export default FirstCol
