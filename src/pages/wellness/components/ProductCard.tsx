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

const ProductCard = ({ products }: ProductCardProps) => {
  useEffect(() => {
    products.forEach((product) => {
      const img = new Image()
      img.src = product.productImage
    })
  }, [products])
  return (
    <div className="flex justify-start items-center">
      {products?.map((product, index) => (
        <Card key={index} className="rounded-md bg-white shadow-md-custom w-1/4 ml-5">
          <CardMedia
            component="img"
            alt={product.productName}
            image={product.productImage}
            className="object-cover"
          />
          <CardContent className="h-[40%] flex flex-col justify-between items-center">
            <Typography gutterBottom variant="h5" component="div" className='text-center text-xl font-bold'>
              {product.productName}
            </Typography>
            <Typography variant="h6" component="div" className="text-red-500 font-bold mt-4">
              {product.productPrice}
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
