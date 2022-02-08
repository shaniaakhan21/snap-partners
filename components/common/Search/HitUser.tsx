import Link from 'next/link'
import { DownloadIcon } from '../icons'
import { IUserData } from 'lib/types/user'

interface IProps {
  hit: IUserData
  onClick: () => void
}

export const HitUser = ({ hit, onClick }: IProps) => (
  <li key={hit.id}>
    <Link href='#'>
      <a
        className='flex items-center p-4 bg-white rounded transition-colors hover:bg-gray-100'
        onClick={onClick}
      >
        {/* <div className='flex-none pr-2 w-14 h-14'>
          <Image
            src={hit.src}
            alt='Imagen del producto'
            width={56}
            height={56}
            layout='responsive'
            className='rounded'
          />
        </div> */}
        <div className='w-full grid items-center justify-center justify-items-center gap-4 grid-cols-3'>
          <span className='inline search-highlight truncate w-full'>
            {hit.name}
          </span>
          <span className='inline search-highlight truncate w-full'>
            {hit.phone}
          </span>
          <div className='inline-flex items-center w-full'>
            <span className='inline search-highlight truncate w-full text-right text-primary-300'>
              <span className='hidden sm:inline mr-1'>ID:</span>{hit.id}
            </span>
            <DownloadIcon classes='ml-1' />
          </div>
        </div>
      </a>
    </Link>
  </li>
)
