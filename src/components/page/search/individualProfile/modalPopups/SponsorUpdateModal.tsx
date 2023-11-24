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
  console.log('coming to this update sponsor modal')
  const handleUpdateSponsor = async (e) => {
    if (confirm('Are you sure you want to edit sponsor for this user')) {
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
            if (result?.data?.data?.success) {
              alert('Sponsor updated')
              window.location.reload()
            }
          })
      }
    }
  }
  const updateSponsor = async (event, param) => {
    setSponsor(event.target.value)
    if (parseInt(event.target.value)) {
      axios.get('/api/user/getUserById', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          id: parseInt(event.target.value)
        }
      })
        .then((result) => {
          if (result.data?.data) {
            setSponsorSearchResult([result.data.data])
          }
        })
    }
    if (event.target.value.length >= 2 && !parseInt(event.target.value)) {
      axios.get(`/api/user/getUserByName?name=${event.target.value}`, {
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
        <InputComponent label={'Update Sponsor'} placeholder='Search sponsor name or ID' value={sponsor} onChangeFunction={updateSponsor} param={'sponsor'} />
        {
          sponserSearchResult &&
          <div className='sponsor-searchResult-container'>
            {
              sponserSearchResult.map((result) => (
                <div className='sponsor-searchResult' onClick={() => {
                  setSelectedSponsor({ ...result })
                  setSponsor(`${result?.name} ${result?.lastname}`)
                }}>{result?.name} {result?.lastname}</div>
              ))
            }
          </div>
        }
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <ButtonComponent title='submit' onClickFunction={handleUpdateSponsor}/>
        </div>
      </Box>
    </Modal>
  )
}

export default SponsorUpdateModal
