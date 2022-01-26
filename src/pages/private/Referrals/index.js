import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import referCustomerCardSrc from '../../../../svg/referCustomersCard.svg'
import { ReferralCards, ReferralListSelected, ReferralTabList } from '../../../components';
import { ReferralListSelectedItem } from '../../../components/ReferralListSelected/ReferralListSelectedItem';
import { ReferralTabListItem } from '../../../components/ReferralTabList/ReferralTabListItem';
// Se deben ordenar las importaciones

export default function Referrals() {
  const [tabOpen, setTabOpen] = useState('1')

  const handleClickTab = (e) => {
    // // e.preventDefault()
    // console.log('event:', e)
    // const { id } = e.target
    // setTabOpen(id)

    // console.log('CLICKED:', id);
  } 

  return (
    <>
      <Helmet>
        <title>Snap Delivered | Referrals</title>
      </Helmet>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
        <ReferralCards
          title='Refer Customers'
          imgSrc={referCustomerCardSrc}
          imgAlt='Representative image of Refer Customer'
          link='Linkhereytocopywhenclick.com'
          newUser
          styles={{ marginRight: '0.5rem' }}
        />
        <ReferralCards 
          title='Refer Drivers'
          imgSrc={referCustomerCardSrc}
          imgAlt='Representative image of Refer Drivers'
          link='Linkhereytocopywhenclick.com'
          styles={{ margin: '0 0.5rem' }}
        />
        <ReferralCards 
          title='Refer Customers'
          imgSrc={referCustomerCardSrc}
          imgAlt='Representative image of Refer Merchant'
          link='Linkhereytocopywhenclick.com'
          newUser
          styles={{ marginLeft: '0.5rem' }}
        />
      </div>

      <div style={{ display: 'flex', marginTop: '20px' }}>
        <ReferralTabList>
          <ReferralTabListItem isSelect={'1' === tabOpen} id='1' newUsers={573} onClick={handleClickTab} />
          <ReferralTabListItem isSelect={'2' === tabOpen} id='2' onClick={handleClickTab} />
          <ReferralTabListItem isSelect={'3' === tabOpen} id='3' onClick={handleClickTab} />
          <ReferralTabListItem isSelect={'4' === tabOpen} id='4' onClick={handleClickTab} />
          <ReferralTabListItem isSelect={'5' === tabOpen} id='5' onClick={handleClickTab} />
          <ReferralTabListItem isSelect={'6' === tabOpen} id='6' onClick={handleClickTab} />
          <ReferralTabListItem isSelect={'7' === tabOpen} id='7' onClick={handleClickTab} />
          <ReferralTabListItem isSelect={'8' === tabOpen} id='8' onClick={handleClickTab} />
          <ReferralTabListItem isSelect={'9' === tabOpen} id='9' onClick={handleClickTab} />
          <ReferralTabListItem isSelect={'10' === tabOpen} id='10' onClick={handleClickTab} />
          <ReferralTabListItem isSelect={'11' === tabOpen} id='11' onClick={handleClickTab} />
        </ReferralTabList>

        <ReferralListSelected id='1' newUsers={573}>
          <ReferralListSelectedItem />
          <ReferralListSelectedItem />
          <ReferralListSelectedItem />
          <ReferralListSelectedItem />
          <ReferralListSelectedItem />
          <ReferralListSelectedItem />
          <ReferralListSelectedItem />
          <ReferralListSelectedItem />
          <ReferralListSelectedItem />
          <ReferralListSelectedItem />
          <ReferralListSelectedItem />
        </ReferralListSelected>
      </div>
    </>
  )
}

// { title, imgSrc, imgAlt, link, newUser = false }