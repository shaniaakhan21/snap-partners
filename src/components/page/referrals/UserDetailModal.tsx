import { MouseEvent } from 'react'
import Link from 'next/link'

import { useCopyToClipboard } from 'lib/hooks/useCopyToClipboard'
import { ILevel, ILevelUser } from 'lib/types/genealogy'
import { TRANK } from 'lib/types/user/ranks'
import { IUserData } from 'lib/types/user'
import { IAuth } from 'lib/stores/Auth'

import { CopyIcon, EmailIcon, InfoIcon, PhoneIcon } from 'components/common/icons'
import { EmptyData } from 'components/common/empty/EmptyData'
import { UpdateUserRank } from './UpdateUserRank'
import { UserBadges } from 'components/common/UserBadges'

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
  levels: ILevel[],
  roles: {
    admin: boolean,
    customer: boolean,
    driver: boolean,
    merchant: boolean,
    agent: boolean
    integrousAssociate: boolean
    integrousCustomer: boolean
  }
}

export const ReferralsUserDetailModal = ({ id, name, lastname, createdAt, email, phone, sponsor, rank, onClick, openNewUserInfo, levels, auth, roles, closeModalManually }: IProps) => {
  const { copy } = useCopyToClipboard()

  return (
    <div className='text-xs sm:text-sm lg:text-base rounded-2xl'>
      <div>
        <div className='mb-4 p-8 flex items-center justify-between rounded-t-2xl bg-[#F5F9FD]'>
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

        <div className='w-full px-8'>
          <div className='flex justify-between items-start'>
            <p className='mb-4 block text-primary-500 font-bold'>{name.toUpperCase()} {lastname?.toUpperCase()}</p>
            <ul className='flex justify-end gap-x-2'>
              <UserBadges userRank={rank} userRoles={roles} />
            </ul>
          </div>
          <div className='flex justify-between items-start' style={{ marginBottom: 10 }}>
            <p className='inline-block'>
                Registered on {' '}
              <span className='inline-block text-primary-500'>
                {createdAt}
              </span>
            </p>
          </div>
        </div>

        <div className='mb-8 px-8 flex flex-col sm:flex-row justify-center sm:items-center sm:justify-between'>
          <div className='inline-flex items-center'>
            <EmailIcon classes='w-5 h-5' />
            <span className='ml-1 text-primary-500'>{email}</span>
          </div>

          <div className='items-center hidden sm:inline-flex'>
            <PhoneIcon classes='w-5 h-5' />
            <span className='ml-1 text-primary-500'>{phone}</span>
          </div>
        </div>
        <hr className='my-4 border-t border-[#CFDFEC]' />
        <div className='px-8 flex justify-between items-center'>
          {
            sponsor
              ? (
                <p className='inline-block'>
                Sponsored by {' '}
                  <span className='inline-block text-primary-500 font-semibold'>
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
      </div>

      <ul className='flex flex-col items-center justify-center mt-4'>
        {
          levels.length === 0 && <EmptyData label='No referrals yet' imgClasses='w-32 h-32' />
        }
        {
          levels && levels.length > 0 &&
            levels.map(level => level.users.map((user: ILevelUser) => (
              <li className='w-[96%] mb-4 last:mb-0 bg-[#F5F9FD] border border-[#CFDFEC] mx-2 rounded-lg'>
                <button
                  className='w-full h-16 text-xs sm:text-sm flex gap-x-2 items-center justify-between transition-colors hover:bg-gray-200 md:px-2'
                  onClick={() => openNewUserInfo(user.id)}
                >
                  <div className='relative w-12 h-12 sm:w-16 sm:h-13 border border-solid rounded-full bg-white border-[#CFDFEC] mr-2'>
                    <div className='font-bold text-lg absolute inset-0.5 sm:inset-1 sm:mt-0.5' style={{ letterSpacing: '-0.10em' }}>L {String(level.level)}</div>
                  </div>

                  <span className='font-bold text-gray-800 w-2/6 text-left truncate uppercase'>{user.name}</span>
                  <span className='hidden sm:inline-block font-bold text-black w-2/6 text-left truncate uppercase'>{user.phoneNumber}</span>

                  <span className='text-[#9A9A9A] w-1/6 text-center truncate font-bold'>ID: <span className='text-black'>{user.id}</span></span>

                  <span
                    style={{ maxWidth: 120 }}
                    className='w-2/6 h-10 bg-white border border-primary-500 rounded-3xl font-bold text-primary-500 cursor-pointer flex items-center justify-center transition-colors hover:bg-primary-500 hover:text-white'
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
