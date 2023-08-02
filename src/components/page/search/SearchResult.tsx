/* eslint-disable no-use-before-define */
import React from 'react'
import { Container, Paper, Avatar, TableContainer, TableBody, TableCell, Table, TableHead, TableRow } from '@mui/material'
import { ButtonComponent } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/Components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { userProfilePictureMapping } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/formOptionData'

function SearchResult ({ resultData }) {
  const router = useRouter()
  const cname = 'profilePage-searchResult'
  const handleViewMore = (e, id:number) => {
    // console.log('view more', id)
    router.push(`/search/profile/${id}`)
  }
  console.log('result from search is', resultData)
  return (
    <Container>
      <p>Result</p>
      <Paper elevation={2} className={`${cname}-container`}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> </TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Rank</TableCell>
                <TableCell>User Level</TableCell>
                <TableCell>Phone num</TableCell>
                <TableCell>Email</TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {
                resultData && resultData?.map((result) => (
                  <TableRow>
                    <TableCell><Avatar src={result?.profileImage ? result?.profileImage : userProfilePictureMapping[result?.ranks?.type]} style={{ width: '40px', height: '40px' }} /></TableCell>
                    <TableCell><p>{`${result?.name} ${result?.lastname}`}</p></TableCell>
                    <TableCell><p>{result?.id}</p></TableCell>
                    <TableCell><p>{result?.ranks?.type}</p></TableCell>
                    <TableCell><p>{result?.level}</p></TableCell>
                    <TableCell><p>{result.phoneNumber}</p></TableCell>
                    <TableCell><p>{result.email}</p></TableCell>
                    <TableCell>
                      <div className={`${cname}-row-button`}>
                      <ButtonComponent title={'view more'} onClickFunction={handleViewMore} param={result.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  )
}

export default SearchResult
