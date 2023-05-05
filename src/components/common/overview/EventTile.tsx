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
    <Card sx={{ maxWidth: '100%', padding: '10px' }}>
      <CardMedia
        className="border-t border-l border-r border-gray-400"
        sx={{ height: 225 }}
        image={image}
        title="green iguana"
      />
      <CardContent className="border-l border-r border-gray-400" >
        <Typography gutterBottom variant="h5" component="div">
          <b>{title}</b>
        </Typography>
        <Typography variant="body2">
          {description}
        </Typography>
      </CardContent>
      <CardActions className="border border-gray-400 flex justify-center" >
        <Link href={redirectUrl} passHref>
          <div role='button'>
            <Typography variant="body1"
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
            <button className="flex text-sm items-center bg-red-600 hover:bg-red-700 text-white font-bold h-8 w-30 py-3 px-4 rounded-l-sm rounded-r-sm">ADD TO CALENDER</button>
          </Link>
        </div>
      </CardActions>
    </Card>
  )
}
