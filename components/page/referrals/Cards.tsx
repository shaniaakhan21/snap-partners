import { ArrowRightIcon, CalendarIcon, CopyIcon } from 'components/common/icons'
import Link from 'next/link'

interface IProps {
  title: string
  ilustration: any
  link: string
  newUser?: boolean
  classes?: string
}

export const ReferralCards = ({ title, ilustration, link, newUser = false, classes = '' }: IProps) => {
  return (
    <div className={`w-full p-6 bg-white flex flex-col items-center justify-center rounded-sm shadow ${classes}`}>
      {/* Es necesario refactorizar el newUser en un nuevo componente  */}
      {newUser
        ? (
          <div className='w-full flex items-center justify-between'>
            <div className='flex items-center justify-center'>
              <div className='h-4 w-4 rounded-sm bg-primary-500 mr-2 last:mr-0' />
              <div className='h-4 w-4 rounded-sm bg-primary-500 mr-2 last:mr-0' />
            </div>

            <div className='inline-flex items-center'>
              <span className='text-textAcent-500 font-bold text-xs mr-2'>NEW USER!</span>
              <span className='text-textHint font-bold text-xs mr-2'>17.08.20</span>
              <CalendarIcon classes='w-4 h-4' />
            </div>
          </div>
        )
        : (
          <div className='h-4' />
        )}
      {/* el div con height imita la altura del anterior componente, si se modifica dicha altura, también se debe modificar el valor */}

      <h3 className='w-full my-4'>{title}</h3>

      {ilustration}

      <hr className='w-full my-4 mx-auto border-t border-gray-300' />

      <button className='text-blue-600 lg:text-black inline-flex items-center justify-center transition-colors hover:text-blue-600' onClick={() => {}}>
        <span className='text-sm mr-2'>{link}</span>
        <CopyIcon classes='w-4 h-4' />
      </button>

      <Link href='#'>
        <a className='w-full p-1 bg-transparentPrimary-8% hover:bg-transparentPrimary-24% text-primary-500 border-2 border-primary-500 rounded-sm mt-4 transition-colors inline-flex items-center justify-center'>
          <span className='font-bold mr-2 text-xs'>Open My Referral Genealogy</span>
          <ArrowRightIcon classes='w-4 h-4' />
        </a>
      </Link>
    </div>
  )
}
