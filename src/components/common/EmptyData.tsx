import { EmptyIllustration } from './illustrations/EmptyIllustration'

interface IEmptyDataProps {
  classes?: string
  label?: string
  description?: string
  imgClasses?: string
}

export const EmptyData = ({ classes, label, description, imgClasses }: IEmptyDataProps) => {
  return (
    <div className={`flex flex-col justify-center items-center ${classes}`}>
      <EmptyIllustration classes={imgClasses} />

      <div className='text-center mt-4'>
        <p className='font-semibold text-lg'>{label}</p>
        <p className='font-normal text-sm'>{description}</p>
      </div>
    </div>
  )
}
