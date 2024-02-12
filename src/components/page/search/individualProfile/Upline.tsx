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
import { userLevelReverseMapping } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/formOptionData'
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function Upline ({ id, currentUserLevel }) {
  const cname = 'user-upline'
  const router = useRouter()
  const mapping = userLevelReverseMapping
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
        console.log('result array is ', resultArray)
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
          <Card variant='outlined' className={`${cname}-card border border-[#DCE5ED] rounded-3xl`}>
            <CardContent className='p-0 cardpadding'>
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} className={`${cname}-card-container pt-4 px-3`}>
                <p className={`${cname}-card-heading text-black`}>{data?.name} {data?.lastname}</p>
                {/* <div style={{ fontSize: '12px' }}> */}
                <a href={`/search/profile/${data?.id}`} className='text-[#E74426]' style={{ fontSize: '12px' }}>View Profile</a>
                {/* <ButtonComponent title='See Profile' onClickFunction={viewProfileFunction} param={data?.id} /> */}
                {/* </div> */}
              </div>

              <div className={`${cname}-card-info px-3`}>
                <p><span className={`${cname}-card-info-title text-[#9A9A9A]`}>id</span>-<span className={`${cname}-card-info-content text-black`}>{data?.id}</span></p>
                <p><span className={`${cname}-card-info-title  text-[#9A9A9A]`}>Rank</span> - <span className={`${cname}-card-info-content text-black capitalize font-semibold`}>{data?.ranks?.type}</span></p>
              </div>

              <div className={`${cname}-card-info bg-[#F0F4F8] py-4 px-3`}>
                <div className='items-center' style={{ display: 'flex', flexDirection: 'row' }}><MailOutlineIcon/><p><span className={`${cname}-card-info-content text-[#E74426] ml-2`}>{data?.email}</span></p></div>
                <div className='items-center' style={{ display: 'flex', flexDirection: 'row' }}><PhoneIcon /><p><span className={`${cname}-card-info-content text-[#5F7081]`}>{data?.phoneNumber}</span></p></div>
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
