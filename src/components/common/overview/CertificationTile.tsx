// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Link } from '@material-ui/core'

export default function CertificationTile ({ title, description, image, redirectUrl }) {
  return (
    <Link href={redirectUrl} className='hover:underline hover:text-red-500'>
      <Card sx={{ maxWidth: '100%' }} role='button' className='rounded-t-3xl rounded-b-none bg-none'>
        <CardMedia
          sx={{ height: 225, backgroundSize: 'contain' }}
          image={image}
          title="green iguana"
        />
        <CardContent>
          <div className='pl-5'>
            <Typography gutterBottom variant="h5" component="div" className='text-sm lg:text-2xl'>
              <b>Certifications</b>
            </Typography>
          </div>
          <div className='pl-5 pb-0 flex flex-row justify-between'>
            <Typography variant="h6" className='text-sm lg:text-xl font-semibold'>
              {title}
            </Typography>
            <Typography variant="body2" className='text-xs lg:text-sm font-normal'>
              {description}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
