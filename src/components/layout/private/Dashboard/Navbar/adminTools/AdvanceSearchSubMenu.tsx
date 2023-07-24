/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import { ArrowDownIcon, DownlineIcon, OrderIcon, Person, TransactionIcon } from 'components/common/icons'
import SearchProfileForm from './searchForms/SearchProfileForm'
import SearchOrderForm from './searchForms/SearchOrderForm'
import SearchTransactionForm from './searchForms/SearchTransactionForm'
import SearchDownlineForm from './searchForms/SearchDownlineForm'

function AdvanceSearchSubMenu () {
  const [searchForms, setSearchForms] = useState<'searchProfileForm' |
                                                 'searchOrderForm' |
                                                 'searchTransactionForm' |
                                                 'searchDownlineForm' |
                                                 'none'>('none')
  const advanceSearchSubMenuData = [
    {
      title: 'Search Profile'
    },
    {
      title: 'Search Order'
    },
    {
      title: 'Search Transaction'
    },
    {
      title: 'Search Downline(for fraud)'
    }
  ]
  return (
    <ul className='subItem'>
      <li className='sub-list-items'>
        <span className='sub-list-span' >
          <span className='list-span-title'><Person /> Search Profile</span><ArrowDownIcon onClick={() => { setSearchForms(searchForms === 'searchProfileForm' ? 'none' : 'searchProfileForm') }} />
        </span>
        { searchForms === 'searchProfileForm'
          ? <SearchProfileForm />
          : <></>
        }
      </li>
      <li className='sub-list-items'>
        <span className='sub-list-span'>
          <span className='list-span-title'><OrderIcon /> Search Order</span><ArrowDownIcon onClick={() => { setSearchForms(searchForms === 'searchOrderForm' ? 'none' : 'searchOrderForm') }} />
        </span>
        { searchForms === 'searchOrderForm'
          ? <SearchOrderForm />
          : <></>
        }
      </li>
      <li className='sub-list-items'>
        <span className='sub-list-span'>
          <span className='list-span-title'><TransactionIcon/> Search Transaction</span><ArrowDownIcon onClick={() => { setSearchForms(searchForms === 'searchTransactionForm' ? 'none' : 'searchTransactionForm') }} />
        </span>
        { searchForms === 'searchTransactionForm'
          ? <SearchTransactionForm />
          : <></>
        }
      </li>
      <li className='sub-list-items'>
        <span className='sub-list-span'>
          <span className='list-span-title'><DownlineIcon/> Search Downline (for fraud)</span><ArrowDownIcon onClick={() => { setSearchForms(searchForms === 'searchDownlineForm' ? 'none' : 'searchDownlineForm') }} />
        </span>
        { searchForms === 'searchDownlineForm'
          ? <SearchDownlineForm />
          : <></>
        }
      </li>
    </ul>
  )
}

export default AdvanceSearchSubMenu
