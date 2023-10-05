/* eslint-disable no-use-before-define */

import { Rank, RankData } from 'lib/types/overview'
import { getLocalStorage, setLocalStorage } from 'lib/utils/localStorage'
import axios from 'axios'

import { useAuthStore } from 'lib/stores'

import React, { useEffect, useState } from 'react'
import RankComponent from 'components/common/overview/RankComponent'
import Commissions from 'components/common/overview/Comissions'

const IndividualDashboard = ({ userId }) => {
  const [rankData, setRankData] = useState<RankData>(null)
  const [viewing, setViewing] = useState<string>('Aug')
  const store = useAuthStore()
  const auth: any = store.auth
  const [openModal, setOpenModal] = useState(!auth.isCertified)

  const currentOverview = getLocalStorage('currentBackoffice') || ''
  const isIntegrous = (auth.roles.integrousAssociate || auth.roles.integrousCustomer)
  const isIntegrousAssociate = auth.roles.integrousAssociate

  useEffect(() => {
    (async () => {
      if (isIntegrous && currentOverview === '') return
      const token = getLocalStorage('accessToken')
      const response = await axios.get('/api/reports/getRanks', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          userId
        }
      })
      console.log('rankData is', response.data)
      setRankData(response.data)
    })()
  }, [])
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <div><RankComponent data={rankData} /></div>
      </div>
      <div>
        <div className='mt-4'>
          <Commissions currentRank={(rankData?.currentRank || 'Free Member') as Rank} userId={userId} />
        </div>
      </div>
    </div>
  )
}

export default IndividualDashboard
