import { MouseEvent } from 'react'

import { useCopyToClipboard } from 'lib/hooks/useCopyToClipboard'
import { IUserData } from 'lib/types/user'

import { CopyIcon, EmailIcon, InfoIcon, PhoneIcon } from 'components/common/icons'
import { TRANK } from 'lib/types/user/ranks'
import { UpdateUserRank } from './UpdateUserRank'
import { IAuth } from 'lib/stores/Auth'
import Link from 'next/link'

interface IProps extends IUserData {
  onClick?: (e: MouseEvent, element: HTMLElement) => void
  referralUsers: any[]
  sponsor?: {
    id: number
    lastname: string
    name: string
  }
  rank?: TRANK
  auth: IAuth
  roles: {
    admin: boolean,
    customer: boolean,
    driver: boolean,
    merchant: boolean
  }
}

export const ReferralsUserDetailModal = ({ id, name, email, phone, sponsor, rank, onClick, auth, roles }: IProps) => {
  const { copy } = useCopyToClipboard()

  return (
    <div className='p-1 text-xs sm:text-sm lg:text-base'>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          {
            auth.roles.admin && (
              <UpdateUserRank
                id={id}
                rank={rank}
                authToken={auth.accessToken}
              />
            )
          }
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
          <ul className='text-gray-800 font-bold flex justify-end gap-x-2'>
            {(rank === 'referralPartner' && roles.customer) && <li><img src='/static/badges/FreeMemberCustomer.png' /> </li>}
            {(rank === 'referralPartner' && roles.driver) && <li><img src='/static/badges/FreeMemberDriver.png' /> </li>}
            {(rank === 'referralPartner' && roles.merchant) && <li><img src='/static/badges/FreeMemberRestaurant.png' /> </li>}

            {(rank === 'manager' && roles.customer) && <li><img src='/static/badges/ManagerCustomer.png' /> </li>}
            {(rank === 'manager' && roles.driver) && <li><img src='/static/badges/ManagerDriver.png' /> </li>}
            {(rank === 'manager' && roles.merchant) && <li><img src='/static/badges/ManagerRestaurant.png' /> </li>}

            {(rank === 'supervisor' && roles.customer) && <li><img src='/static/badges/SupervisorCustomer.png' /> </li>}
            {(rank === 'supervisor' && roles.driver) && <li><img src='/static/badges/SupervisorDriver.png' /> </li>}
            {(rank === 'supervisor' && roles.merchant) && <li><img src='/static/badges/SupervisorRestaurant.png' /> </li>}

            {(rank === 'director' && roles.customer) && <li><img src='/static/badges/DirectorCustomer.png' /> </li>}
            {(rank === 'director' && roles.driver) && <li><img src='/static/badges/DirectorDriver.png' /> </li>}
            {(rank === 'director' && roles.merchant) && <li><img src='/static/badges/DirectorRestaurant.png' /> </li>}

            {(rank === 'executive' && roles.customer) && <li><img src='/static/badges/ExecutiveCustomer.png' /> </li>}
            {(rank === 'executive' && roles.driver) && <li><img src='/static/badges/ExecutiveDriver.png' /> </li>}
            {(rank === 'executive' && roles.merchant) && <li><img src='/static/badges/ExecutiveRestaurant.png' /> </li>}
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
          <a>
            <InfoIcon />
          </a>
        </Link>
      </div>
    </div>
  )
}
