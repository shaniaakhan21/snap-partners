import { ReactNode } from 'react'
interface CommonHeaderProps {
  text: string;
  icon: ReactNode;
}

const CommonHeader = ({ text, icon }: CommonHeaderProps) => {
  return (
    <>
      <div className="flex flex-row space-x-5 items-center">
        <div>
          {icon}
        </div>
        <div className='text-textAcent-500 font-bold'>
          <span>{text}</span>
        </div>
      </div>
    </>
  )
}

export default CommonHeader
