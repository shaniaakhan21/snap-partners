import { MouseEvent } from 'react'
import Link from 'next/link'

import { useCopyToClipboard } from 'lib/hooks/useCopyToClipboard'
import { ILevel, ILevelUser } from 'lib/types/genealogy'
import { TRANK } from 'lib/types/user/ranks'
import { IUserData } from 'lib/types/user'
import { IAuth } from 'lib/stores/Auth'

import { CopyIcon, EmailIcon, InfoIcon, PhoneIcon } from 'components/common/icons'
import { EmptyData } from 'components/common/EmptyData'
import { UpdateUserRank } from './UpdateUserRank'

interface IProps extends IUserData {
  onClick?: (e: MouseEvent, element: HTMLElement) => void
  openNewUserInfo: (id: number) => void
  closeModalManually?: () => void
  referralUsers: any[]
  sponsor?: {
    id: number
    lastname: string
    name: string
  }
  rank?: TRANK
  auth: IAuth
  levels: ILevel[]
  roles: {
    admin: boolean,
    customer: boolean,
    driver: boolean,
    merchant: boolean
  }
}

export const ReferralsUserDetailModal = ({ id, name, email, phone, sponsor, rank, onClick, openNewUserInfo, levels, auth, roles, closeModalManually }: IProps) => {
  const { copy } = useCopyToClipboard()

  return (
    <div className='p-1 text-xs sm:text-sm lg:text-base'>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          {auth.roles.admin && (
            <UpdateUserRank
              id={id}
              rank={rank}
              authToken={auth.accessToken}
            />
          )}
        </div>

        <div className={`flex mt-0 sm:mt-8 ${auth.roles.admin ? 'flex-col items-end sm:flex-row sm:items-center justify-end' : 'items-center justify-end'}`}>
          <span className='text-primary-500 font-bold'>USER ID</span>

          <button
            onClick={() => copy(id.toString(), 'ID')}
            className={`ml-3 text-blue-600 flex items-end transition-colors hover:text-blue-600 lg:text-textHint ${auth.roles.admin ? 'flex-col sm:flex-row sm:items-center' : 'items-center'}`}
          >
            <span className={`${auth.roles.admin ? 'sm:mr-3' : 'mr-3'}`}>{id}</span>
            <CopyIcon classes="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      <hr className='my-4 bordet-t border-gray-300' />

      <div className='w-full'>
        <div className='flex justify-between items-start'>
          <p className='mb-4 block text-primary-500 font-bold'>{name.toUpperCase()}</p>
          <ul className='flex justify-end gap-x-2'>
            {(rank === 'referralPartner' && roles.customer) && <li><img src='/static/badges/FreeMemberCustomer.png' /> </li>}
            {(rank === 'referralPartner' && roles.driver) && <li><img src='/static/badges/FreeMemberDriver.png' /> </li>}
            {(rank === 'referralPartner' && roles.merchant) && <li><img src='/static/badges/FreeMemberMerchant.png' /> </li>}

            {(rank === 'manager' && roles.customer) && <li><img src='/static/badges/ManagerCustomer.png' /> </li>}
            {(rank === 'manager' && roles.driver) && <li><img src='/static/badges/ManagerDriver.png' /> </li>}
            {(rank === 'manager' && roles.merchant) && <li><img src='/static/badges/ManagerMerchant.png' /> </li>}

            {(rank === 'supervisor' && roles.customer) && <li><img src='/static/badges/SupervisorCustomer.png' /> </li>}
            {(rank === 'supervisor' && roles.driver) && <li><img src='/static/badges/SupervisorDriver.png' /> </li>}
            {(rank === 'supervisor' && roles.merchant) && <li><img src='/static/badges/SupervisorMerchant.png' /> </li>}

            {(rank === 'director' && roles.customer) && <li><img src='/static/badges/DirectorCustomer.png' /> </li>}
            {(rank === 'director' && roles.driver) && <li><img src='/static/badges/DirectorDriver.png' /> </li>}
            {(rank === 'director' && roles.merchant) && <li><img src='/static/badges/DirectorMerchant.png' /> </li>}

            {(rank === 'executive' && roles.customer) && <li><img src='/static/badges/ExecutiveCustomer.png' /> </li>}
            {(rank === 'executive' && roles.driver) && <li><img src='/static/badges/ExecutiveDriver.png' /> </li>}
            {(rank === 'executive' && roles.merchant) && <li><img src='/static/badges/ExecutiveMerchant.png' /> </li>}
          </ul>
        </div>
      </div>

      <div className='mb-8 flex flex-col sm:flex-row justify-center sm:items-center sm:justify-between'>
        <div className='inline-flex items-center'>
          <EmailIcon classes='w-5 h-5' />
          <span className='ml-1 text-blue-600'>{email}</span>
        </div>

        <div className='inline-flex items-center'>
          <PhoneIcon classes='w-5 h-5' />
          <span className='ml-1 text-blue-600'>{phone}</span>
        </div>
      </div>

      <div className='flex justify-between items-center'>
        {
          sponsor
            ? (
              <p className='inline-block'>
              Sponsored by {' '}
                <span className='inline-block text-primary-500'>
                  {`${sponsor.name} ${sponsor.lastname ? sponsor.lastname : ''}`}
                </span>
              </p>
            )
            : (
              <p className='inline-block'>No Sponsored</p>
            )
        }

        <Link href='/glosary'>
          <a onClick={closeModalManually}>
            <InfoIcon />
          </a>
        </Link>
      </div>

      <hr className='my-4 bordet-t border-gray-300' />

      <ul className='flex flex-col items-center justify-center mt-4'>
        {
          levels.length === 0 && <EmptyData label='No referrals yet' imgClasses='w-32 h-32' />
        }
        {
          levels && levels.length > 0 &&
            levels.map(level => level.users.map((user: ILevelUser) => (
              <li className='w-full mb-4 last:mb-0'>
                <button
                  className='w-full h-16 text-xs sm:text-sm flex gap-x-2 items-center justify-between transition-colors hover:bg-gray-200 md:px-2'
                  onClick={() => openNewUserInfo(user.id)}
                >
                  <div className='relative w-16 h-12 border-4 border-solid border-black mr-2'>
                    <div className='font-bold text-lg tracking-tighter absolute inset-1 mt-0.5'>L {String(level.level)}</div>
                  </div>

                  <span className='font-bold text-gray-800 w-2/6 text-left truncate uppercase'>{user.name}</span>
                  <span className='font-bold text-gray-800 w-2/6 text-left truncate uppercase'>{user.phoneNumber}</span>

                  <span className='text-primary-500 w-1/6 text-center truncate'>ID: {user.id}</span>

                  <span
                    style={{ maxWidth: 120 }}
                    className='w-2/6 h-10 bg-primary-500 rounded-3xl font-bold text-white cursor-pointer flex items-center justify-center transition-colors hover:bg-hoverPrimary'
                  >
                    VIEW MORE
                  </span>
                </button>
              </li>
            )))
        }
      </ul>
    </div>
  )
}
