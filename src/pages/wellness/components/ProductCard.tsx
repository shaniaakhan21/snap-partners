/* eslint-disable no-use-before-define */
/* eslint-disable no-constant-condition */
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Button } from 'components/common/Button'
import Typography from '@mui/material/Typography'
import React, { useEffect } from 'react'
import Client, { Config, Cart } from 'shopify-buy'

interface ProductInfo {
  productName: string;
  productImage: string;
  productPrice: string;
}

interface ProductCardProps {
  products: ProductInfo[];
}

const ProductCard = ({ products, userId, collectionId, isLoggedIn }) => {
  React.useEffect(() => {
    products.forEach((product) => {
      const img = new Image()
      img.src = product.productImage
    })
  }, [products])
  let cart:any
  let client:any
  let updatedCart:any
  let ShopifyBuy:any
  React.useEffect(() => {
    // if (isLoggedIn && isAssociate !== null)
    if (true) {
      // Create and load the script
      const script = document.createElement('script')
      script.src = 'https://www.integrouswellness.com/storefront.v1.js'
      script.async = true

      script.onload = async () => {
        ShopifyBuy = window.ShopifyBuy
        const client = Client.buildClient({
          domain: '0f4c5e-3.myshopify.com',
          storefrontAccessToken: 'e06de8605c8ed7c79a04d618e0b3eeb7',
          apiVersion: '2022-07'
        })

        // let collectionId = "446876746030";
        // let collectionId = "447611863342";
        // if (isAssociate) {
        //   collectionId = "447611863342";
        // }
        const totalProducts = await client.product.fetchAll()
        const tp = []
        const gp = []
        // for(let i=0; i<totalProducts.length;i++)
        // {
        //   let product = totalProducts[i]
        //   console.log('title is ', product.title)
        //   if(product.title.includes('Tea') || product.title.includes('Coffee') || product.title.includes('Coffee/Tea') || product.title.includes('Tea/Coffee'))
        //   {
        //       console.log('in tea coffee')
        //       tp.push(totalProducts[i])
        //       setTeaCoffeeProducts(tp)
        //   }
        //   else{
        //       console.log('in General')
        //       gp.push(totalProducts[i])
        //       setGeneralProducts(gp)
        //   }
        // }
        // console.log('products from shopify are', totalProducts, teaCoffeeProducts,generalProducts);

        ShopifyBuy.UI.onReady(client).then((ui) => {
          ui.createComponent('collection', {
            id: collectionId,
            node: document.getElementById('collection-component-tabs'),
            moneyFormat: '%24%7B%7Bamount%7D%7D',
            options: {
              cart: {
                customAttributes: [{ key: 'UID', value: String(userId) }],
                popup: false
              }
            }
          })
        })
      }

      document.body.appendChild(script)

      // Cleanup on unmount
      return () => {
        document.body.removeChild(script)
      }
    }
  }, [collectionId, userId])

  // useEffect(() => {
  //   const cartUI = cart.createCart(client, updatedCart); // Pass the updated cart

  //   // Render the cart UI
  //   cartUI.render('.cart-container'); // Replace with your cart container element
  // }, [updatedCart])

  // const handleAddToCart = async (product) => {
  //   const variantId = product.id;
  //   const quantity = 1; // Adjust the quantity as needed

  //   const lineItemsToAdd = [{ variantId, quantity }];

  //   updatedCart = await client.checkout.addLineItems(cart.id, lineItemsToAdd);

  //   console.log('updateCart',updatedCart)
  // }
  return (
    <div className="flex md:flex-row flex-col justify-start items-center">
      <div id='collection-component-tabs'></div>
      {/* {products?.map((product, index) => (
        <Card key={index} className="rounded-md bg-white shadow-md-custom w-full lg:w-1/4 ml-5 m-5 lg:m-1">
          <CardMedia
            component="img"
            alt={product?.title}
            image={product?.variants[0]?.image?.src}
            className="object-cover"
          />
          <CardContent className="h-[40%] flex flex-col justify-between items-center">
            <Typography gutterBottom variant="h5" component="div" className='text-center text-xl font-bold'>
              {product?.title}
            </Typography>
            <Typography variant="h6" component="div" className="text-red-500 font-bold mt-4">
              {`$${product?.variants[0]?.price?.amount}`}
            </Typography>
            <div className='pt-1'>
              {/* <Button onClick={() => {}} classes='text-base bg-btn-color rounded-lg px-7 uppercase mt-2'>
                <i className="fa fa-shopping-cart mr-5" aria-hidden="true"></i>
              Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      ))} */}
    </div>
  )
}

export default ProductCard
