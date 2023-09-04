import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Button } from 'components/common/Button'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'

interface ProductInfo {
  productName: string;
  productImage: string;
  productPrice: string;
}

interface ProductCardProps {
  products: ProductInfo[];
}

const ProductCard = ({ products }) => {
  useEffect(() => {
    products.forEach((product) => {
      const img = new Image()
      img.src = product.productImage
    })
  }, [products])
  return (
    <div className="flex md:flex-row flex-col justify-start items-center">
      {products?.map((product, index) => (
        <Card key={index} className="rounded-md bg-white shadow-md-custom w-full lg:w-1/4 ml-5 m-5 lg:m-1">
          <CardMedia
            component="img"
            alt={product.node.title}
            image={product.node.variants.edges[0].node.image.src}
            className="object-cover"
          />
          <CardContent className="h-[40%] flex flex-col justify-between items-center">
            <Typography gutterBottom variant="h5" component="div" className='text-center text-xl font-bold'>
              {product.node.title}
            </Typography>
            <Typography variant="h6" component="div" className="text-red-500 font-bold mt-4">
              {`$${product.node.variants.edges[0].node.price.amount}`}
            </Typography>
            <div className='pt-1'>
              <Button classes='text-base bg-btn-color rounded-lg px-7 uppercase mt-2'>
                <i className="fa fa-shopping-cart mr-5" aria-hidden="true"></i>
              Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ProductCard
