// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default function EventTile ({ title, description, image, redirectUrl }) {
  return (
    <Card sx={{ maxWidth: '100%' }} className='rounded-t-3xl rounded-b-none'>
      <CardMedia
        sx={{ height: 225, backgroundSize: 'contain' }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <b>{title}</b>
        </Typography>
        <Typography variant="body2" className='text-[#7B7B7B]'>
          {description}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-center" >
        <Link href={redirectUrl} passHref>
          <div role='button'>
            <Typography variant="body1"
              className='text-[#E74426]  font-semibold'
              sx={{
                fontSize: '15px'
              }}
            >
            See more
            </Typography>
          </div>
        </Link>
        <div className='pl-5'>
          <Link href='/#'>
            <button className="flex text-sm items-center bg-[#E74426] hover:bg-red-700 text-white font-bold h-8 w-30 py-3 px-4 rounded-3xl">ADD TO CALENDER</button>
          </Link>
        </div>
      </CardActions>
    </Card>
  )
}
