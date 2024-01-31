import { IEmptyDataProps } from 'lib/types/empty'
import { NewEmptyIllustration } from '../illustrations/NewEmptyIllustration'

export const EmptyData = ({ classes, label, description, imgClasses }: IEmptyDataProps) => {
  return (
    <div className={`flex flex-col justify-center items-center bg-white w-full py-8 rounded-3xl shadow-[0_1px_17px_-1px_rgba(0,0,0,0.2)] ${classes}`}>
      <NewEmptyIllustration classes={imgClasses} />

      <div className='text-center mt-4'>
        <p className='font-semibold text-lg'>{label}</p>
        <p className='font-normal text-sm'>{description}</p>
      </div>
    </div>
  )
}
