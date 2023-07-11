/* eslint-disable no-use-before-define */
import React from 'react'

function IndividualProfileHeader ({ body, setBody }) {
    const cname = 'profilePage-individualProfile'
  return (
    <div className={`${cname}-header`}>
          <ul className={`${cname}-header-list`}>
            <li className={body === 'iboProfile' ? `${cname}-header-listItems listItems-active` : `${cname}-header-listItems`}
            onClick={() => setBody('iboProfile')}>IBO profile</li>
            <li className={`${cname}-header-listItems`}>comissions</li>
            <li className={`${cname}-header-listItems`}>transactions</li>
            <li className={body === 'order' ? `${cname}-header-listItems listItems-active` : `${cname}-header-listItems`}
            onClick={() => setBody('order')}>Order</li>
            <li className={`${cname}-header-listItems`}>subscription</li>
            <li className={`${cname}-header-listItems`}>tickets</li>
            <li className={`${cname}-header-listItems`}>upline</li>
            <li className={`${cname}-header-listItems`}>downline</li>
            <li className={`${cname}-header-listItems`}>Login as rep</li>
          </ul>
        </div>
  )
}

export default IndividualProfileHeader