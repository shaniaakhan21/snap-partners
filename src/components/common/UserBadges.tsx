import Tippy from '@tippyjs/react'
import { TRANK } from 'lib/types/user/ranks'

interface IUserBadgesProps {
  userRank: TRANK
  userRoles: {
    customer: boolean
    driver: boolean
    merchant: boolean
  }
}

export const UserBadges = ({ userRank, userRoles }: IUserBadgesProps) => {
  return (
    <>
      {(userRank === 'referralPartner' && userRoles.customer) && (
        <Tippy content='Referral Partner'>
          <li>
            <img src='/static/badges/FreeMemberCustomer.png' />
          </li>
        </Tippy>
      )}
      {(userRank === 'referralPartner' && userRoles.driver) && (
        <Tippy content='Referral Partner'>
          <li>
            <img src='/static/badges/FreeMemberDriver.png' />
          </li>
        </Tippy>
      )}
      {(userRank === 'referralPartner' && userRoles.merchant) && (
        <Tippy content='Referral Partner'>
          <li>
            <img src='/static/badges/FreeMemberMerchant.png' />
          </li>
        </Tippy>
      )}

      {(userRank === 'manager' && userRoles.customer) && (
        <Tippy content='Manager'>
          <li>
            <img src='/static/badges/ManagerCustomer.png' />
          </li>
        </Tippy>
      )}
      {(userRank === 'manager' && userRoles.driver) && (
        <Tippy content='Manager'>
          <li>
            <img src='/static/badges/ManagerDriver.png' />
          </li>
        </Tippy>
      )}
      {(userRank === 'manager' && userRoles.merchant) && (
        <Tippy content='Manager'>
          <li>
            <img src='/static/badges/ManagerMerchant.png' />
          </li>
        </Tippy>
      )}

      {(userRank === 'supervisor' && userRoles.customer) && (
        <Tippy content='Supervisor'>
          <li>
            <img src='/static/badges/SupervisorCustomer.png' />
          </li>
        </Tippy>
      )}
      {(userRank === 'supervisor' && userRoles.driver) && (
        <Tippy content='Supervisor'>
          <li>
            <img src='/static/badges/SupervisorDriver.png' />
          </li>
        </Tippy>
      )}
      {(userRank === 'supervisor' && userRoles.merchant) && (
        <Tippy content='Supervisor'>
          <li>
            <img src='/static/badges/SupervisorMerchant.png' />
          </li>
        </Tippy>
      )}

      {(userRank === 'director' && userRoles.customer) && (
        <Tippy content='Director'>
          <li>
            <img src='/static/badges/DirectorCustomer.png' />
          </li>
        </Tippy>
      )}
      {(userRank === 'director' && userRoles.driver) && (
        <Tippy content='Director'>
          <li>
            <img src='/static/badges/DirectorDriver.png' />
          </li>
        </Tippy>
      )}
      {(userRank === 'director' && userRoles.merchant) && (
        <Tippy content='Director'>
          <li>
            <img src='/static/badges/DirectorMerchant.png' />
          </li>
        </Tippy>
      )}

      {(userRank === 'executive' && userRoles.customer) && (
        <Tippy content='Executive Director'>
          <li>
            <img src='/static/badges/ExecutiveCustomer.png' />
          </li>
        </Tippy>
      )}
      {(userRank === 'executive' && userRoles.driver) && (
        <Tippy content='Executive Director'>
          <li>
            <img src='/static/badges/ExecutiveDriver.png' />
          </li>
        </Tippy>
      )}
      {(userRank === 'executive' && userRoles.merchant) && (
        <Tippy content='Executive Director'>
          <li>
            <img src='/static/badges/ExecutiveMerchant.png' />
          </li>
        </Tippy>
      )}
    </>
  )
}
