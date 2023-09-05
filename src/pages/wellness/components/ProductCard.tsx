import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Button } from 'components/common/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { Grid } from '@mui/joy'
import { Modal } from '@mui/material'
import Router from 'next/router'

interface ProductInfo {
  productName: string;
  productImage: string;
  productPrice: string;
}

interface ProductCardProps {
  products: ProductInfo[];
}

const ProductCard = ({ products }) => {
  const [open, setOpen] = useState(false)
  const handleLogin = () => {
    const referralCode = localStorage.getItem('referralCode') || 'NoSponsor'
    Router.push(`/auth/login-wellness?redirectToWellness=true&referralCode=${referralCode}`)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAddToCart = () => {
    handleOpen()
  }
  useEffect(() => {
    products.forEach((product) => {
      const img = new Image()
      img.src = product.productImage
    })
  }, [products])
  return (
    <Grid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {products?.map((product, index) => (
        <Card key={index} className="h-[fit-content] rounded-md bg-white shadow-md-custom w-11/12 ml-5 lg:m-4 3xl:m-4 mb-6 lg:mb-0" >
          <CardMedia
            component="img"
            alt={product.node.title}
            image={product.node.variants.edges[0].node.image.src}
            className="object-cover"
          />
          <CardContent className="h-[fit-content] flex flex-col justify-between items-center ">
            <Typography gutterBottom variant="h5" component="div" className='text-center text-xl font-bold 3xl:text-2xl  3xl:mt-6'>
              {product.node.title}
            </Typography>
            <Typography variant="h6" component="div" className="text-red-500 font-bold mt-4 3xl:text-3xl">
              {`$${product.node.variants.edges[0].node.price.amount}`}
            </Typography>
            <div className='pt-1'>
              <Button classes='text-base bg-btn-color rounded-lg px-7 uppercase mt-2 3xl:text-xl 3xl:px-10 3xl:py-4' onClick={handleAddToCart}>
                <i className="fa fa-shopping-cart mr-5" aria-hidden="true"></i>
              Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Modal open={open} onClose={handleClose}>
        <Card
          sx={{
            background: '#000000e0',
            border: '#0000004f 1px solid',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            position: 'absolute',
            top: '20%'
          }}
          className="md:px-20 md:py-10 rounded-2xl mt-1 3xl:mt-32 w-8/12 xl:w-6/12 3xl:w-5/12 backdrop-blur-4xl left-16 lg:left-1/4"
        >
          <CardContent>
            <h1 className="text text-white text-2xl md:text-3xl 2xl:text-4xl 3xl:text-6xl font-semibold-it font-normal text-center mb-4 2xl:mb-5 3xl:mb-8">
              Purchase <span className='text-red-h'>Now</span>
            </h1>
            <p className="text text-white font-light text-center">
              <Button onClick={() => { handleLogin() }} classes=' text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-4xl bg-btn-color rounded-lg px-8 2xl:py-2 3xl:py-5'>
              LOG IN / SIGN UP
                <i className="fa fa-sign-in ml-2" aria-hidden="true"></i>
              </Button>
            </p>
          </CardContent>

        </Card>
      </Modal>

    </Grid>
  )
}

export default ProductCard
