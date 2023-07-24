/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import axios from 'axios'
import { getLocalStorage } from 'lib/utils/localStorage'
import { SpinnerPageContent } from 'components/common/loaders/PageContent'
import { ButtonComponent } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
import { PhoneIcon } from 'components/common/icons'
import { useRouter } from 'next/router'

function Upline ({ id }) {
  const cname = 'user-upline'
  const router = useRouter()
  const [UplineData, setUplineData] = useState([])
  const [userId, setUserId] = useState<number>(id)
  const [isLoading, setIsLoading] = useState(false)
  const token = getLocalStorage('accessToken')
  const getUplineData = async () => {
    setIsLoading(true)
    await axios.get(`/api/upline/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((result) => {
        console.log('result from getUplineData', result.data.resultData)
        const resultArray = result.data.resultData
        resultArray.reverse()
        setUplineData(resultArray)
        setIsLoading(false)
      })
      .catch((e) => {
        console.log('error while getting upline')
        setIsLoading(false)
      })
  }
  useEffect(() => {
    getUplineData()
  }, [userId])

  const viewProfileFunction = (id?:number) => {
    router.push(`/search/profile/${id}`)
  }
  return (
    <div className={`${cname}-container`}>
      {UplineData && !isLoading
        ? UplineData?.map((data) => (
          <Card variant='outlined' className={`${cname}-card`}>
            <CardContent>
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className={`${cname}-card-container`}>
                <p className={`${cname}-card-heading`}>{data?.name} {data?.lastname}</p>
                {/* <div style={{ fontSize: '12px' }}> */}
                  <a href={`/search/profile/${id}`} style={{ fontSize: '12px' }}>View Profile</a>
                  {/* <ButtonComponent title='See Profile' onClickFunction={viewProfileFunction} param={data?.id} /> */}
                {/* </div> */}
              </div>

              <div className={`${cname}-card-info`}>
                <p><span className={`${cname}-card-info-title`}>id</span>-<span className={`${cname}-card-info-content`}>{data?.id}</span></p>
                <p><span className={`${cname}-card-info-title`}>Rank</span>-<span className={`${cname}-card-info-content`}>{data?.ranks?.type}</span></p>
              </div>

              <div className={`${cname}-card-info`}>
                <div style={{ display: 'flex', flexDirection: 'row' }}><img src='/images/icons/email.svg'/><p><span className={`${cname}-card-info-content`}>{data?.email}</span></p></div>
                <div style={{ display: 'flex', flexDirection: 'row' }}><PhoneIcon classes='w-4 h-4' /><p><span className={`${cname}-card-info-content`}>{data?.phoneNumber}</span></p></div>
              </div>
            </CardContent>
          </Card>
        ))
        : <SpinnerPageContent />
      }
    </div>
  )
}

export default Upline
