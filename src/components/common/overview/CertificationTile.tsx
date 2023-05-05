// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Link } from '@material-ui/core'

export default function CertificationTile ({ title, description, image, redirectUrl }) {
  return (
    <Link href={redirectUrl}>
      <Card sx={{ maxWidth: '100%', padding: '10px' }} role='button'>
        <CardContent sx={{ borderTop: '5px solid #fe0002' }} className="border-l border-r border-gray-400" >
          <div className='pl-5'>
            <Typography gutterBottom variant="h5" component="div">
              <b>{title}</b>
            </Typography>
          </div>
          <div className='pl-5 pb-5'>
            <Typography variant="body2">
              {description}
            </Typography>
          </div>
        </CardContent>
        <CardMedia
          className="border-t border-l border-r border-b border-gray-400"
          sx={{ height: 225 }}
          image={image}
          title="green iguana"
        />
      </Card>
    </Link>
  )
}
