interface HeaderComponentProps {
    title: string;
  }

const CustomSearchHeader = ({ title }: HeaderComponentProps) => (
  <div className="flex flex-row space-x-5">
    <div>
      <img src='images/payroll/custom-icon.svg' alt="Custom Icon" />
    </div>
    <div className="text-lg font-semibold not-italic flex flex-row justify-between w-full">
      <div>
        <span>{title}</span>
      </div>
    </div>
  </div>
)

export default CustomSearchHeader
