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
    <Container className='m-0 p-0 w-full max-w-full '>
      <p className='text-black font-semibold mt-4'>Result</p>
      <Paper elevation={2} className={`${cname}-container mt-4`}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className='bg-[#F0F4F8] border-b-2 border-[#DCE5ED]'>
                <TableCell className='text-black font-medium'> </TableCell>
                <TableCell className='text-black font-medium'>Full Name</TableCell>
                <TableCell className='text-black font-medium'>ID</TableCell>
                <TableCell className='text-black font-medium'>Rank</TableCell>
                <TableCell className='text-black font-medium'>User Level</TableCell>
                <TableCell className='text-black font-medium'>Phone num</TableCell>
                <TableCell className='text-black font-medium'>Email</TableCell>
                <TableCell className='text-black font-medium'> </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {
                resultData && resultData?.map((result) => (
                  <TableRow>
                    <TableCell className='border-b border-[#EFF3F8] text-black font-medium'><Avatar src={result?.profileImage ? result?.profileImage : userProfilePictureMapping[result?.ranks?.type]} style={{ width: '40px', height: '40px' }} className='border-2 border-[#DCE5ED]' /></TableCell>
                    <TableCell className='border-b border-[#EFF3F8] text-black font-medium'><p>{`${result?.name} ${result?.lastname}`}</p></TableCell>
                    <TableCell className='border-b border-[#EFF3F8] text-black font-medium'><p>{result?.id}</p></TableCell>
                    <TableCell className='border-b border-[#EFF3F8] text-black font-medium'><p>{result?.ranks?.type}</p></TableCell>
                    <TableCell className='border-b border-[#EFF3F8] text-black font-medium'><p>{result?.level}</p></TableCell>
                    <TableCell className='border-b border-[#EFF3F8] text-black font-medium'><p>{result.phoneNumber}</p></TableCell>
                    <TableCell className='border-b border-[#EFF3F8] text-black font-medium'><p>{result.email}</p></TableCell>
                    <TableCell className='border-b border-[#EFF3F8] text-black font-medium'>
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
