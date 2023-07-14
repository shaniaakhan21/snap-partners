/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import axios from 'axios'
import { getLocalStorage } from 'lib/utils/localStorage'
import { SpinnerPageContent } from 'components/common/loaders/PageContent'

function Upline ({ id }) {
  const cname = 'user-upline'
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
        setUplineData(result.data.resultData)
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
  return (
    <div className={`${cname}-container`}>
      {UplineData && !isLoading
        ? UplineData?.map((data) => (
          <Card variant='outlined' className={`${cname}-card`}>
            <CardContent>
              <p>id-{data?.id}</p>
              <p>rank-{data?.ranks?.type}</p>
              <p>name-{data?.name}</p>
            </CardContent>
            <CardActions>
              <button onClick={() => { setUserId(data?.id) }}>see upline</button>
            </CardActions>
          </Card>
        ))
        : <SpinnerPageContent />
      }
    </div>
  )
}

export default Upline
