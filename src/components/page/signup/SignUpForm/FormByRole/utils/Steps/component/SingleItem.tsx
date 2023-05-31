import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea, Button } from '@mui/material'
import { styled } from '@mui/system'

const ResponsiveCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    maxWidth: '87%',
    padding: theme.spacing(1)
  }
}))

export default function SingleItem ({ userId, image, name, price }) {
  let link = ''
  if (price === '$249.00') {
    link = `https://0f4c5e-3.myshopify.com/cart/45373739991342:1?attributes[UID]=${userId}`
  }
  if (price === '$499.00') {
    link = `https://0f4c5e-3.myshopify.com/cart/45373746413870:1?attributes[UID]=${userId}`
  }
  return (
    <ResponsiveCard sx={{ background: 'none', boxShadow: 'none' }}>
      <CardActionArea>
        <img src={image} style={{ padding: '4%' }} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: 'center', color: 'black', fontSize: '19px!important' }}
          >
            {name}
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'black' }}>
            {price}
          </Typography>
          <Button
            onClick={() => { window.location.href = link }}
            variant="contained"
            sx={{
              width: '95%',
              ml: 1,
              alignItems: 'center',
              backgroundColor: '#78B657',
              color: 'white!important',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#999999!important'
              },
              '&:active': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)!important',
                color: '#999999!important'
              },
              '&:focus': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)!important',
                color: '#999999!important'
              },
              mt: 1
            }}
            fullWidth
          >
            Buy Now
          </Button>
        </CardContent>
      </CardActionArea>
    </ResponsiveCard>
  )
}

SingleItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
}
