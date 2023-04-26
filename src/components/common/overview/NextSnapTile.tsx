// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function NextSnapTile ({ title, description, image }) {
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
      <CardActions className="border border-gray-400" >
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}
