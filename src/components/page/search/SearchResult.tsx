/* eslint-disable no-use-before-define */
import React from 'react'
import { Container, Paper, Avatar } from '@mui/material'
import { ButtonComponent } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
import Link from 'next/link'
import { useRouter } from 'next/router'

function SearchResult ({ resultData }) {
  const router = useRouter()
  const cname = 'profilePage-searchResult'
  const handleViewMore = (id:number) => {
    // console.log('view more', id)
    router.push(`/search/profile/${id}`)
  }
  console.log('result from search is', resultData)
  return (
    <Container>
      <p>Result</p>
      <Paper elevation={2} className={`${cname}-container`}>
        {
          resultData && resultData?.map((result) => (
            <div className={`${cname}-row`}>
              <Avatar style={{ width: '40px', height: '40px' }} />
              <p>{`${result.name} ${result.lastname}`}</p>
              <p>{result.id}</p>
              <p>{result?.ranks?.percentage}</p>
              <p>{result.grandfatherRank}</p>
              <p>{result.phoneNumber}</p>
              <p>{result.email}</p>
              <div className={`${cname}-row-button`}>
                <ButtonComponent title={'view more'} onClickFunction={handleViewMore} param={result.id} />
              </div>
            </div>
          ))
        }
      </Paper>
    </Container>
  )
}

export default SearchResult
