import React from 'react'
import {
  CurrentRank,
  EstimatedCommissions,
  Graphics,
  MyOrders,
  OverViewGrid,
  PayRank,
  PromotionTracker,
  Stepper,
  TopCustomerAcquisition,
  TopDriverAcquisition,
  TopEntitiesGrid,
  TopOrderLine,
  TopRestaurantsAcquisition,
  TotalEarnings,
  TotalOrders
} from '../../../components/Overview'

export const DashboardPage = () => {
  const data = [
    {
      name: '1a',
      pv: 2400
    },
    {
      name: '6m',
      pv: 1398
    },
    {
      name: '1m',
      pv: 9800
    },
    {
      name: '1s',
      pv: 3908
    },
    {
      name: '1d',
      pv: 4800
    }
  ]

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-4 max-w-6xl mx-auto w-full h-fit gap-4'>
        <Graphics data={data} />
        <PromotionTracker data={{}} />
      </div>

      <OverViewGrid>
        <Stepper data={{}} />
        <TotalEarnings data={{}} />
        <TotalOrders data={{}} />
        <EstimatedCommissions data={{}} />
        <MyOrders data={{}} />
        <PayRank data={{}} />
        <CurrentRank data={{}} />
      </OverViewGrid>

      <TopEntitiesGrid>
        <TopRestaurantsAcquisition data={{}} />
        <TopDriverAcquisition data={{}} />
        <TopCustomerAcquisition data={{}} />
        <TopOrderLine data={{}} />
      </TopEntitiesGrid>
    </>
  )
}