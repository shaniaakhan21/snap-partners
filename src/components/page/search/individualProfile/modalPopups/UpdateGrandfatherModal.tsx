/* eslint-disable no-use-before-define */
import { Box, Modal } from '@mui/material'
import axios from 'axios'
import { ButtonComponent, InputComponent, SelectComponent } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
import { grandfatherRankOptions } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/formOptionData'
import { getLocalStorage } from 'lib/utils/localStorage'
import React, { useState, useEffect } from 'react'

function UpdateGrandfatherModal ({ grandfatherModal, onCloseGrandfatherModal, userId, profileData }) {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }
  useEffect(() => {
    setGrandfatherRank({
      ...grandfatherRank,
      rank: profileData?.gRanks[0]?.gRank,
      from: formatDate(profileData?.gRanks[0]?.from),
      to: formatDate(profileData?.gRanks[0]?.to)
    })
  }, [profileData])
  const [grandfatherRank, setGrandfatherRank] = useState({
    rank: '',
    from: null,
    to: null

  })

  const formatDate = (dateString) => {
    if (dateString) {
      const currentDate = new Date(dateString)
      return `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + (currentDate.getDate())).slice(-2)}`
    }
  }
  const token = getLocalStorage('accessToken')
  const handleUpdateGrandfatherRank = async (e) => {
    console.log('update grandfather rank to', grandfatherRank)

    if (profileData?.gRanks.length > 0) {
      await axios.put(`/api/admin/gRank/${userId}`, {
        gRank: grandfatherRank.rank,
        from: grandfatherRank.from,
        to: grandfatherRank.to,
        id: profileData.gRanks[0].id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      )
        .then((result) => {
          if (result.data.data.isSuccess) {
            alert('Grandfather Rank Updated Successfully')
            window.location.reload()
          }
        })
    } else {
      await axios.post('/api/admin/gRank', {
        gRank: grandfatherRank.rank,
        from: grandfatherRank.from,
        to: grandfatherRank.to,
        userId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      )
        .then((result) => {
          if (result.data.data.isSuccess) {
            alert('Grandfather Rank created Successfully')
            window.location.reload()
          }
        })
    }

    // const token = getLocalStorage('accessToken')
    // if (userLevel !== '') {
    //   const body = {
    //     userLevel
    //   }
    //   await axios.put(`/api/admin/updateUserLevel/${userId}`, body, {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    //   })
    //     .then((result) => {
    //       if (result.data.result[0]) {
    //         alert('User Level Updated Successfully')
    //         window.location.reload()
    //       }
    //     })
    // }
  }

  const handleDeleteGrandfatherRank = async () => {
    if (confirm('You want to delete Grandfather rank for this user')) {
      axios.delete(`/api/admin/gRank/${profileData?.gRanks[0]?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((result) => {
          if (result.data.data.isSuccess) {
            alert('Grandfather Rank Deleted Successfully')
            window.location.reload()
          }
        })
    }
  }

  const updateGrandfatherRank = (event, param) => {
    if (param === 'grandfatherRank') {
      setGrandfatherRank({ ...grandfatherRank, rank: event.target.value })
    }
    if (param === 'from') {
      setGrandfatherRank({ ...grandfatherRank, from: event.target.value })
    }
    if (param === 'to') {
      setGrandfatherRank({ ...grandfatherRank, to: event.target.value })
    }
  }
  return (
    <Modal open={grandfatherModal} onClose={onCloseGrandfatherModal} className='resetPasswordModal'>
      <Box sx={style}>
        <SelectComponent label={'Edit Grandfather Rank'} name={'grandfatherRank'} value={grandfatherRank?.rank} options={grandfatherRankOptions} onChangeFunction={updateGrandfatherRank} param={'grandfatherRank'} />
        <InputComponent label='from' placeholder='from Date' type={'date'} value={grandfatherRank?.from} onChangeFunction={updateGrandfatherRank} param={'from'} />
        <InputComponent label='to' placeholder='to Date' type={'date'} value={grandfatherRank?.to} onChangeFunction={updateGrandfatherRank} param={'to'} />
        <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
          <ButtonComponent title='submit' onClickFunction={handleUpdateGrandfatherRank}/>
          <ButtonComponent title='delete' onClickFunction={handleDeleteGrandfatherRank}/>
        </div>
      </Box>
    </Modal>
  )
}

export default UpdateGrandfatherModal
