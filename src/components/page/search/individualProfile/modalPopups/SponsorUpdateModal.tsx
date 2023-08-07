/* eslint-disable no-use-before-define */
import { Box, Modal } from '@mui/material'
import axios from 'axios'
import { ButtonComponent, InputComponent } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
// import { userLevelOptions } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/formOptionData'
import { getLocalStorage } from 'lib/utils/localStorage'
import React, { useState } from 'react'

function SponsorUpdateModal ({ sponsorUpdateModal, onCloseSponsorUpdateModal, userId }) {
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
  const token = getLocalStorage('accessToken')
  const [sponsor, setSponsor] = useState('')
  const [sponserSearchResult, setSponsorSearchResult] = useState([])
  const [selectedSponsor, setSelectedSponsor] = useState(null)
  const handleUpdateUserLevel = async (e) => {
    if (selectedSponsor) {
      if (userId === selectedSponsor.id) {
        alert("user and sponsor can't be same")
        return
      }
      await axios.put('/api/user/sponsor', {
        userId,
        sponsorId: selectedSponsor.id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((result) => {
          console.log('result from sponsor api', result?.data)
          if (result?.data?.data?.success) {
            alert('Sponsor updated')
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
    //   })
    //     .then((result) => {
    //       if (result.data.result[0]) {
    //         alert('User Level Updated Successfully')
    //         window.location.reload()
    //       }
    //     })
    // }
  }
  const updateSponsor = async (event, param) => {
    setSponsor(event.target.value)
    if (sponsor.length >= 2) {
      axios.get(`/api/user/getUserByName?name=${sponsor}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((result) => {
          if (result.data?.result?.length > 0) {
            setSponsorSearchResult(result.data.result)
          }
        })
    } else {
      setSponsorSearchResult([])
    }
  }
  return (
    <Modal open={sponsorUpdateModal} onClose={onCloseSponsorUpdateModal} className='resetPasswordModal'>
      <Box sx={style}>
        <InputComponent label={'Update Sponsor'} placeholder='Search sponsor name' value={sponsor} onChangeFunction={updateSponsor} param={'sponsor'} />
        {
          sponserSearchResult &&
          <div className='sponsor-searchResult-container'>
            {
              sponserSearchResult.map((result) => (
                <div className='sponsor-searchResult' onClick={() => {
                  setSelectedSponsor({ ...result })
                  setSponsor(result.name)
                }}>{result?.name}</div>
              ))
            }
          </div>
        }
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <ButtonComponent title='submit' onClickFunction={handleUpdateUserLevel}/>
        </div>
      </Box>
    </Modal>
  )
}

export default SponsorUpdateModal
